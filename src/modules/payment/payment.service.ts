import httpStatus from 'http-status';
import Stripe from 'stripe';
import config from '../../config';
import { prisma } from '../../lib/prisma';
import ApiError from '../../errors/ApiError';

const stripe = new Stripe(config.stripe.secret_key as string, {
  apiVersion: '2025-01-27' as any, 
});

const createPaymentIntent = async (userId: string, rentalRequestId: string) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id: rentalRequestId },
  });

  if (!rentalRequest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rental request not found');
  }


  if (rentalRequest.status !== 'APPROVED') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Rental request is not approved yet');
  }

  const amountInCents = Math.round(rentalRequest.totalPrice * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    payment_method_types: ['card'],
    metadata: { rentalRequestId, userId },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    transactionId: paymentIntent.id,
    amount: rentalRequest.totalPrice,
  };
};

const confirmPayment = async (userId: string, payload: { transactionId: string; rentalRequestId: string }) => {
  return await prisma.$transaction(async (tx: any) => {
    
    
    const rentalRequest = await tx.rentalRequest.findUnique({
      where: { id: payload.rentalRequestId }
    });

    if (!rentalRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Rental request not found');
    }

    
    const payment = await tx.payment.create({
      data: {
        userId,
        rentalRequestId: payload.rentalRequestId,
        amount: rentalRequest.totalPrice, 
        transactionId: payload.transactionId,
        status: 'COMPLETED',
      },
    });

  
    await tx.rentalRequest.update({
      where: { id: payload.rentalRequestId },
      data: { status: 'APPROVED' }, 
    });

    return payment;
  });
};

const getMyPaymentHistory = async (userId: string) => {
  return await prisma.payment.findMany({
    where: { userId },
    include: { rentalRequest: { include: { property: true } } },
  });
};

export const PaymentService = {
  createPaymentIntent,
  confirmPayment,
  getMyPaymentHistory,
};
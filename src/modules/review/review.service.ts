import httpStatus from 'http-status';
import { prisma } from '../../lib/prisma';
import ApiError from '../../errors/ApiError';
import { IReviewData } from './review.interface';

const createReview = async (userId: string, payload: IReviewData) => {
  
  const hasCompletedRental = await prisma.rentalRequest.findFirst({
    where: {
      userId,
      propertyId: payload.propertyId,
      status: 'APPROVED', 
    },
  });

  if (!hasCompletedRental) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You can only leave a review after booking/renting this property!'
    );
  }

  return await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      userId,
      propertyId: payload.propertyId,
    },
    include: {
      user: { select: { name: true } },
    },
  });
};

const getPropertyReviews = async (propertyId: string) => {
  return await prisma.review.findMany({
    where: { propertyId },
    include: {
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const ReviewService = {
  createReview,
  getPropertyReviews,
};
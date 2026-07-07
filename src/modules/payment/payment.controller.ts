import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';
import httpStatus from 'http-status';

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.createPaymentIntent((req as any).user.id, req.body.rentalRequestId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment intent created successfully',
    data: result,
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.confirmPayment((req as any).user.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment confirmed and completed successfully',
    data: result,
  });
});

const getMyPaymentHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getMyPaymentHistory((req as any).user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment history retrieved successfully',
    data: result,
  });
});

export const PaymentController = {
  createPaymentIntent,
  confirmPayment,
  getMyPaymentHistory,
};
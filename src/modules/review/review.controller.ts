import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewService } from './review.service';
import httpStatus from 'http-status';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview((req as any).user.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review submitted successfully',
    data: result,
  });
});

const getPropertyReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getPropertyReviews(req.params.propertyId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property reviews fetched successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getPropertyReviews,
};
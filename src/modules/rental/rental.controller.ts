import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentalService } from './rental.service';
import httpStatus from 'http-status';

const createRentalRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await RentalService.createRentalRequest((req as any).user.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Rental request submitted successfully',
    data: result,
  });
});

const getMyRentals = catchAsync(async (req: Request, res: Response) => {
  const { id, role } = (req as any).user;
  const result = await RentalService.getMyRentals(id, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental history fetched successfully',
    data: result,
  });
});

const updateRequestStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  
  if (!id) {
    throw new Error('User ID is required');
  }
  const result = await RentalService.updateRequestStatus(id, req.body.status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Rental request status updated to ${req.body.status}`,
    data: result,
  });
});

export const RentalController = {
  createRentalRequest,
  getMyRentals,
  updateRequestStatus,
};
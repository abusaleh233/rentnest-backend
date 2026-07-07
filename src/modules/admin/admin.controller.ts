import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';
import httpStatus from 'http-status';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllUsersForAdmin();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully for admin overview',
    data: result,
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllPropertiesForAdmin();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All property listings retrieved successfully for admin',
    data: result,
  });
});

const getAllRentals = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllRentalsForAdmin();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All rental requests retrieved successfully for admin',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
 const id = req.params.id as string;
  if (!id) {
    throw new Error('User ID is required');
  }
  const result = await AdminService.deleteUserByAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User moderated/removed successfully',
    data: result,
  });
});

export const AdminController = {
  getAllUsers,
  getAllProperties,
  getAllRentals,
  deleteUser,
};
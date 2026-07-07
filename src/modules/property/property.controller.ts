import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PropertyService } from './property.service';
import httpStatus from 'http-status';

const createProperty = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyService.createProperty((req as any).user.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Property listed successfully',
    data: result,
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyService.getAllProperties(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Properties listed retrieved successfully',
    data: result,
  });
});

const getPropertyDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  
  if (!id) {
    throw new Error('User ID is required');
  }
  const result = await PropertyService.getPropertyDetails(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property details fetched successfully',
    data: result,
  });
});

export const PropertyController = {
  createProperty,
  getAllProperties,
  getPropertyDetails,
};
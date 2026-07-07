import httpStatus from 'http-status';
import { prisma } from '../../lib/prisma';
import ApiError from '../../errors/ApiError';
import { IRentalRequestData } from './rental.interface';

const createRentalRequest = async (userId: string, payload: IRentalRequestData) => {
  const property = await prisma.property.findUnique({
    where: { id: payload.propertyId },
  });

  if (!property || !property.isAvailable) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Property is not available for rent');
  }

  return await prisma.rentalRequest.create({
    data: {
      userId,
      propertyId: payload.propertyId,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      totalPrice: payload.totalPrice,
      status: 'PENDING',
    },
  });
};

const getMyRentals = async (userId: string, role: string) => {
  if (role === 'OWNER') {
    
    return await prisma.rentalRequest.findMany({
      where: { property: { ownerId: userId } },
      include: { user: { select: { name: true, email: true } }, property: true },
    });
  }
  
  
  return await prisma.rentalRequest.findMany({
    where: { userId },
    include: { property: true },
  });
};

const updateRequestStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
  return await prisma.rentalRequest.update({
    where: { id },
    data: { status },
  });
};

export const RentalService = {
  createRentalRequest,
  getMyRentals,
  updateRequestStatus,
};
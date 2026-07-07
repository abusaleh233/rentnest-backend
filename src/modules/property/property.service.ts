import { prisma } from '../../lib/prisma';
import { IPropertyFilterRequest } from './property.interface';

const createProperty = async (userId: string, payload: any) => {
  const result = await prisma.property.create({
    data: {
      ...payload,
      ownerId: userId,
    },
  });
  return result;
};

const getAllProperties = async (filters: IPropertyFilterRequest) => {
  const { searchTerm, minPrice, maxPrice, location } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' as const } },
        { description: { contains: searchTerm, mode: 'insensitive' as const } },
      ],
    });
  }

  if (location) {
    andConditions.push({ location: { contains: location, mode: 'insensitive' as const } });
  }

  if (minPrice) {
    andConditions.push({ price: { gte: parseFloat(minPrice) } });
  }

  if (maxPrice) {
    andConditions.push({ price: { lte: parseFloat(maxPrice) } });
  }

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  return await prisma.property.findMany({
    where: whereConditions,
    include: { owner: { select: { name: true, email: true } }, category: true },
  });
};

const getPropertyDetails = async (id: string) => {
  return await prisma.property.findUnique({
    where: { id },
    include: { owner: true, category: true, reviews: true },
  });
};

export const PropertyService = {
  createProperty,
  getAllProperties,
  getPropertyDetails,
};
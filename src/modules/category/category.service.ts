import { prisma } from '../../lib/prisma';
import { ICategoryData } from './category.interface';

const createCategory = async (payload: ICategoryData) => {
  return await prisma.category.create({
    data: payload,
  });
};

const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: { properties: true },
      },
    },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
};
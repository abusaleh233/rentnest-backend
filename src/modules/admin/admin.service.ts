import { prisma } from '../../lib/prisma';

const getAllUsersForAdmin = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getAllPropertiesForAdmin = async () => {
  return await prisma.property.findMany({
    include: {
      owner: { select: { name: true, email: true } },
      category: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getAllRentalsForAdmin = async () => {
  return await prisma.rentalRequest.findMany({
    include: {
      user: { select: { name: true, email: true } },
      property: { select: { title: true, price: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};


const deleteUserByAdmin = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
    select: { id: true, email: true },
  });
};

export const AdminService = {
  getAllUsersForAdmin,
  getAllPropertiesForAdmin,
  getAllRentalsForAdmin,
  deleteUserByAdmin,
};
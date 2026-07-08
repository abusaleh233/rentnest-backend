import bcrypt from 'bcrypt';
import config from '../../config';
import { prisma } from '../../lib/prisma';
import { IUserFilterRequest } from './user.interface';
import { Role } from '../../../generated/prisma/enums';

const registerUser = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds));
  
 
  payload.password = hashedPassword;

 
  const userData = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: Role.USER 
  };

  const result = await prisma.user.create({
    data: userData, 
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  return result;
};

const getMyProfile = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
};

const getAllUsers = async (filters: IUserFilterRequest) => {
  const { searchTerm, role } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' as const } },
        { email: { contains: searchTerm, mode: 'insensitive' as const } },
      ],
    });
  }

  if (role) {
    andConditions.push({ role: role as any });
  }

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  return await prisma.user.findMany({
    where: whereConditions,
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
};

export const UserService = {
  registerUser,
  getMyProfile,
  getAllUsers,
};
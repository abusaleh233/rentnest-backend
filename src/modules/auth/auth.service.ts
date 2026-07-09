import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import ApiError from '../../errors/ApiError';
import { JwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { ILoginUserResponse } from './auth.interface';



const loginUser = async (payload: any): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const accessToken = JwtHelpers.generateToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.access_secret,
    config.jwt.access_expires_in
  );

  return { accessToken };
};

export const AuthService = {
  loginUser,
};
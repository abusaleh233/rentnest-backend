import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { z } from 'zod';

const router = express.Router();

const registerValidation = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(6, 'Min 6 characters'),
    role: z.enum(['USER', 'ADMIN', 'OWNER']), // Prisma schema enums এর সাথে মিলিয়ে লিখবেন
  }),
});

router.post('/register', validateRequest(registerValidation), UserController.registerUser);
router.get('/me', auth('USER', 'ADMIN', 'OWNER'), UserController.getMyProfile);
router.get('/', auth('ADMIN'), UserController.getAllUsers);

export default router;
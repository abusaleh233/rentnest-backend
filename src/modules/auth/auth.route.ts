import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { z } from 'zod';

const router = express.Router();

const loginValidation = z.object({
  body: z.object({
    email: z.string().email('Valid email is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

router.post('/login', validateRequest(loginValidation), AuthController.loginUser);



export default router;
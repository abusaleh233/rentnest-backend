import express from 'express';
import { PaymentController } from './payment.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { z } from 'zod';

const router = express.Router();

const intentValidation = z.object({
  body: z.object({
    rentalRequestId: z.string().min(1, 'Rental Request ID is required'),
  }),
});

const confirmValidation = z.object({
  body: z.object({
    transactionId: z.string().min(1, 'Transaction ID is required'),
    rentalRequestId: z.string().min(1, 'Rental Request ID is required'),
  }),
});

router.post('/create-intent', auth('USER'), validateRequest(intentValidation), PaymentController.createPaymentIntent);
router.post('/confirm', auth('USER'), validateRequest(confirmValidation), PaymentController.confirmPayment);
router.get('/history', auth('USER'), PaymentController.getMyPaymentHistory);

export default router;
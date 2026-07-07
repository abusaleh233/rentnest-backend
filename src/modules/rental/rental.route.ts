import express from 'express';
import { RentalController } from './rental.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { z } from 'zod';

const router = express.Router();

const rentalValidation = z.object({
  body: z.object({
    propertyId: z.string().min(1, 'Property ID is required'),
    startDate: z.string().datetime('Invalid start date format'),
    endDate: z.string().datetime('Invalid end date format'),
    totalPrice: z.number().positive('Total price must be positive'),
  }),
});

const statusValidation = z.object({
  body: z.object({
    status: z.enum(['APPROVED', 'REJECTED']),
  }),
});

router.post('/', auth('USER'), validateRequest(rentalValidation), RentalController.createRentalRequest);
router.get('/', auth('USER', 'OWNER', 'ADMIN'), RentalController.getMyRentals);
router.patch('/:id/status', auth('OWNER', 'ADMIN'), validateRequest(statusValidation), RentalController.updateRequestStatus);

export default router;
import express from 'express';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { z } from 'zod';

const router = express.Router();

const reviewValidation = z.object({
  body: z.object({
    rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
    comment: z.string().optional(),
    propertyId: z.string().min(1, 'Property ID is required'),
  }),
});

router.post('/', auth('USER'), validateRequest(reviewValidation), ReviewController.createReview);
router.get('/property/:propertyId', ReviewController.getPropertyReviews);

export default router;
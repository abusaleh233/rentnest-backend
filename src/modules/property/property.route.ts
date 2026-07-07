import express from 'express';
import { PropertyController } from './property.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { z } from 'zod';

const router = express.Router();

const propertyValidation = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be a positive number'),
    location: z.string().min(1, 'Location is required'),
    categoryId: z.string().min(1, 'Category ID is required'),
  }),
});

router.post('/', auth('OWNER', 'ADMIN'), validateRequest(propertyValidation), PropertyController.createProperty);
router.get('/', PropertyController.getAllProperties);
router.get('/:id', PropertyController.getPropertyDetails);

export default router;
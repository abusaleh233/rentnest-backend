import express from 'express';
import { CategoryController } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { z } from 'zod';

const router = express.Router();

const categoryValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
  }),
});

router.post('/', auth('ADMIN'), validateRequest(categoryValidation), CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);

export default router;
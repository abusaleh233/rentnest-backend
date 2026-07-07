import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// সমস্ত রুট শুধুমাত্র ADMIN রোলের জন্য প্রোটেক্টেড থাকবে
router.get('/users', auth('ADMIN'), AdminController.getAllUsers);
router.get('/properties', auth('ADMIN'), AdminController.getAllProperties);
router.get('/rentals', auth('ADMIN'), AdminController.getAllRentals);
router.delete('/users/:id', auth('ADMIN'), AdminController.deleteUser);

export default router;
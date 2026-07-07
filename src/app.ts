import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import globalErrorHandler from './middlewares/globalErrorHandler';
import authRoutes from './modules/auth/auth.route';
import userRoutes from './modules/user/user.route';
import propertyRoutes from './modules/property/property.route';
import categoryRoutes from './modules/category/category.route';
import rentalRoutes from './modules/rental/rental.route';
import paymentRoutes from './modules/payment/payment.route';
import reviewRoutes from './modules/review/review.route';
import adminRoutes from './modules/admin/admin.route';

const app: Application = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);




app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'RentNest API is running smoothly!' });
});

// Global Error Handler
app.use(globalErrorHandler);

// 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found!' });
});

export default app;
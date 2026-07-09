import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import config from '../config/index.js';


const auth = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ success: false, message: 'You are not authorized!' });
      return;
    }

    //  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const decoded = jwt.verify(token,config.jwt.access_secret) as JwtPayload;
    if (roles.length && !roles.includes(decoded.role)) {
      res.status(403).json({ success: false, message: 'Forbidden access!' });
      return;
    }
     (req as any).user = decoded;

    
    next();
  });
};

export default auth;
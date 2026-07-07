import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 10,
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-key',
    expires_in: process.env.JWT_EXPIRES_IN || '1d',
  },
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY,
  }
};
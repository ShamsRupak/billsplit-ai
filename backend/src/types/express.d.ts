import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: any; // User document from MongoDB
    }
  }
}

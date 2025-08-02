import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import User from '../models/User';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res
      .status(401)
      .json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization token missing or malformed' });
  }

  if (!process.env.JWT_SECRET) {
    // If the secret isn't configured the request can never be authenticated
    return res.status(500).json({ message: 'JWT secret not configured' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret,
    ) as JwtPayload;
    const userId = (decoded as any).id;
    req.user = await User.findById(userId).select('-password');
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

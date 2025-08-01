import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';
import { logger } from '../utils/logger';

// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Register User
export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    logger.info(`New user registered: ${user.email}`);

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id),
    });
  } catch (error) {
    logger.error(`User registration failed: ${error}`);
    res.status(500).json({ message: 'User registration failed' });
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user._id),
    });
  } catch (error) {
    logger.error(`Login failed: ${error}`);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Get User Profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    logger.error(`Retrieve user profile failed: ${error}`);
    res.status(500).json({ message: 'Retrieve user profile failed' });
  }
};

// Update User Profile
export const updateProfile = async (req: Request, res: Response) => {
  const { name, bio } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    logger.error(`Update profile failed: ${error}`);
    res.status(500).json({ message: 'Update profile failed' });
  }
};

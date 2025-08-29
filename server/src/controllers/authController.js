import { validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { Task } from '../models/Task.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { signToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
  }
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ success: false, message: 'Email already in use' });

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email, passwordHash });

  const token = signToken({ id: user._id, email: user.email, name: user.name });
  res.status(201).json({ success: true, message: 'Account created', data: { token } });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const match = await comparePassword(password, user.passwordHash);
  if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const token = signToken({ id: user._id, email: user.email, name: user.name });
  res.json({ success: true, message: 'Logged in', data: { token } });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select('name email createdAt');
  res.json({ success: true, message: 'Me', data: { user } });
};


export const deleteAccount = async (req, res) => {
  const userId = req.user.id;
  await Task.deleteMany({ userId });
  await User.findByIdAndDelete(userId);
  return res.json({ success: true, message: 'Account deleted' });
};

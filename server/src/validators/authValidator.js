import { body } from 'express-validator';


export const validateRegister = [
body('name').trim().notEmpty().withMessage('Name is required'),
body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
body('password').isLength({ min: 6 }).withMessage('Min 6 chars password')
];


export const validateLogin = [
body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
body('password').notEmpty().withMessage('Password is required')
];
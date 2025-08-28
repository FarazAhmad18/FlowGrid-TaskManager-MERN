import { body } from 'express-validator';


export const validateCreateTask = [
body('title').trim().notEmpty().withMessage('Title required'),
body('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),
body('priority').optional().isIn(['low', 'med', 'high']).withMessage('Invalid priority'),
body('dueDate').optional().isISO8601().toDate(),
body('labels').optional().isArray().withMessage('Labels must be array of strings')
];


export const validateUpdateTask = [
body('title').optional().trim().notEmpty(),
body('status').optional().isIn(['todo', 'in-progress', 'done']),
body('priority').optional().isIn(['low', 'med', 'high']),
body('dueDate').optional().isISO8601().toDate(),
body('labels').optional().isArray()
];
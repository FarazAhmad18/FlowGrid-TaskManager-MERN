// server/src/controllers/taskController.js
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { Task } from '../models/Task.js';

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

/**
 * GET /api/tasks
 * Query: page, limit, sort, status, priority, label (csv), q (text search)
 */
export const listTasks = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      status,
      priority,
      label,
      q,
    } = req.query;

    const filter = { userId: toObjectId(req.user.id) };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (label) filter.labels = { $in: label.split(',').map((v) => v.trim()) };
    if (q) filter.$text = { $search: q };

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);

    const [items, total] = await Promise.all([
      Task.find(filter).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      Task.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      message: 'Tasks',
      data: {
        items,
        meta: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/tasks/:id
 */
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    return res.json({ success: true, message: 'Task', data: { task } });
  } catch (err) {
    return next(err);
  }
};

/**
 * POST /api/tasks
 */
export const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const body = req.body;
    const task = await Task.create({ ...body, userId: req.user.id });

    return res.status(201).json({ success: true, message: 'Task created', data: { task } });
  } catch (err) {
    return next(err);
  }
};

/**
 * PUT /api/tasks/:id
 * Pushes change entries to changes[]
 */
export const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const existing = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const updatable = ['title', 'description', 'status', 'priority', 'dueDate', 'labels'];
    const changes = [];

    for (const key of updatable) {
      if (key in req.body) {
        const oldVal = existing[key];
        const newVal = req.body[key];
        const changed =
          Array.isArray(oldVal) || Array.isArray(newVal)
            ? JSON.stringify(oldVal) !== JSON.stringify(newVal)
            : String(oldVal ?? '') !== String(newVal ?? '');
        if (changed) {
          changes.push({ field: key, oldValue: oldVal, newValue: newVal, changedAt: new Date() });
          existing[key] = newVal;
        }
      }
    }

    if (changes.length) existing.changes.push(...changes);
    await existing.save();

    return res.json({ success: true, message: 'Task updated', data: { task: existing } });
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /api/tasks/:id
 */
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    return res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    return next(err);
  }
};

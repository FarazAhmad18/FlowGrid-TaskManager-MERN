import mongoose from 'mongoose';


const changeSchema = new mongoose.Schema(
{
field: String,
oldValue: mongoose.Schema.Types.Mixed,
newValue: mongoose.Schema.Types.Mixed,
changedAt: { type: Date, default: Date.now }
},
{ _id: false }
);


const taskSchema = new mongoose.Schema(
{
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
title: { type: String, required: true, trim: true },
description: { type: String, default: '' },
status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo', index: true },
priority: { type: String, enum: ['low', 'med', 'high'], default: 'med', index: true },
dueDate: { type: Date },
labels: { type: [String], default: [] },
changes: { type: [changeSchema], default: [] }
},
{ timestamps: true }
);


taskSchema.index({ title: 'text', description: 'text' });


export const Task = mongoose.model('Task', taskSchema);
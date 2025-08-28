import mongoose from 'mongoose';
import { Task } from '../models/Task.js';


export const overview = async (req, res) => {
const userId = new mongoose.Types.ObjectId(req.user.id);
const today = new Date();


const [byStatus, byPriority, overdue] = await Promise.all([
Task.aggregate([
{ $match: { userId } },
{ $group: { _id: '$status', count: { $sum: 1 } } }
]),
Task.aggregate([
{ $match: { userId } },
{ $group: { _id: '$priority', count: { $sum: 1 } } }
]),
Task.countDocuments({ userId, dueDate: { $lt: today }, status: { $ne: 'done' } })
]);


res.json({
success: true,
message: 'Overview stats',
data: {
byStatus,
byPriority,
overdue
}
});
};
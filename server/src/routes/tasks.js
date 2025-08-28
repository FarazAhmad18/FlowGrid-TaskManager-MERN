import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import {
listTasks,
getTask,
createTask,
updateTask,
deleteTask
} from '../controllers/taskController.js';
import { validateCreateTask, validateUpdateTask } from '../validators/taskValidator.js';


const router = Router();


router.use(auth);


router.get('/', listTasks);
router.get('/:id', getTask);
router.post('/', validateCreateTask, createTask);
router.put('/:id', validateUpdateTask, updateTask);
router.delete('/:id', deleteTask);


export default router;
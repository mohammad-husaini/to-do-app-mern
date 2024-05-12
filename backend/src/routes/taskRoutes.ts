import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask, searchTasks } from '../controllers/taskController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.use(authenticateUser);

router.post('/tasks', createTask);

router.get('/tasks', getTasks);

router.get('/tasks/search-by-title', searchTasks);

router.get('/tasks/:taskId', getTaskById);

router.put('/tasks/:taskId', updateTask);

router.delete('/tasks/:taskId', deleteTask);


export default router;

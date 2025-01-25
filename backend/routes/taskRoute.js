import express from 'express';
import { createTask, updateTaskStatus, getAllTasks, deleteTask } from '../controllers/taskController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/task", protect, createTask); // Only authenticated users can create tasks
router.put("/task/status", protect, updateTaskStatus);
router.get("/tasks", protect, getAllTasks); // Only authenticated users can view their tasks
router.delete("/task/:taskId", protect, deleteTask);

export default router;
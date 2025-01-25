import Task from "../models/taskModel.js";


export const createTask = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id; 

  try {
    const newTask = new Task({ name, description, user: userId }); 
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task status", error });
  }
};

export const getAllTasks = async (req, res) => {
  const userId = req.user._id; // Assuming you have user authentication middleware

  try {
    const tasks = await Task.find({ user: userId }); // Fetch tasks for the currently authenticated user
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
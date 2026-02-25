const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, assigned_to, deadline } = req.body;
    const taskId = await Task.create(title, description, req.user.id, assigned_to, priority, deadline);
    res.status(201).json({ message: 'Task created', taskId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll(req.user.id, req.user.role);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Task.updateStatus(id, status);
    res.json({ message: 'Task updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
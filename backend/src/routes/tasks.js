import express from 'express'
import Task from '../models/Task.js'
import authMiddleware from '../utils/authMiddleware.js'

const router = express.Router()

router.post('/tasks', authMiddleware, async (req, res, next) => {
    const { title, description, priority, dueDate } = req.body
    try {
        const task = await Task.create({ title, description, priority, dueDate, userId: req.user.id })
        res.status(201).json(task)
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
})

router.get('/tasks', authMiddleware, async (req, res) => {
    try {
      const tasks = await Task.findAll({where: { userId: req.user.id}});
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/tasks/:id', authMiddleware,  async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (task) {
        const { title, description, priority, dueDate } = req.body;
        task.title = title || task.title;
        task.description = description || task.description;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;
        await task.save();
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/tasks/:id', authMiddleware, async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (task) {
        await task.destroy();
        res.status(200).json({ message: 'Task deleted' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  export default router
import express from 'express'
import moment from 'moment'
import cron from 'node-cron'
import Task from '../models/Task.js'
import authMiddleware from '../utils/authMiddleware.js'

const router = express.Router()

const calculateNextRun = (task) => {
  const nextRunDate = moment(task.nextRunDate)
  switch (task.recurrencePattern) {
    case 'daily':
      return nextRunDate.add(1, 'days').toDate()
    case 'weekly':
      return nextRunDate.add(1, 'weeks').toDate()
    case 'monthly':
      return nextRunDate.add(1, 'months').toDate()
    default:
      return nextRunDate
  }
}

function getCronExpression(pattern) {
  // TODO: Add logic to make days of months dynamic
  switch (pattern) {
    case 'daily':
      return '0 9 * * *'; // Every day at 9 AM
    case 'weekly':
      return '0 9 * * 1'; // Every Monday at 9 AM
    case 'monthly':
      return '0 9 1 * *'; // 1st of every month at 9 AM
    default:
      return '* * * * *'; // Run every minute (default)
  }
}

router.post('/tasks', authMiddleware, async (req, res, next) => {
  const { title, description, priority, dueDate, isRecurring, recurrencePattern } = req.body
  try {
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      isRecurring,
      recurrencePattern,
      nextRunDate: dueDate,
      userId: req.user.id
    })

    if (task.isRecurring) {
      const cronExpression = getCronExpression(task.recurrencePattern);

      cron.schedule(cronExpression, async () => {
        const updatedTask = await Task.findByPk(task.id)
        if (updatedTask) {
          const now = moment()
          const nextRunDate = moment(updatedTask.nextRunDate)

          if (now.isSameOrAfter(nextRunDate)) {
            // TODO: Add reminder logic
            console.log(`Task: ${updatedTask.title} is due`)

            const newNextRunDate = calculateNextRun(updatedTask);
            await updatedTask.update({ nextRunDate: newNextRunDate });

            await updatedTask.update({ status: 'in-Progress' })
          }
        }
      })
    }

    res.status(201).json(task)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.get('/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/tasks/:id', authMiddleware, async (req, res) => {
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

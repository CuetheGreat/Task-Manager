import express from 'express'
import sequelize from '../database/config.js'
import User from './models/User.js'
import Task from './models/Task.js'

const app = express()

try {
    await sequelize.sync()
    console.log('Database Synced')
} catch (e) {
    console.log("Error syncing Database: ", e)
}

app.get('/', (req, res) => {
    res.send("Welcome to the Task Sceduler API")
})

export default app
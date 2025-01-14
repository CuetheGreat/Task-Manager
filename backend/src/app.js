import express from 'express'
import taskRoutes from './routes/tasks.js'
import authRoutes from './routes/auth.js'
import morgan from 'morgan'


const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api', taskRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to the Task Sceduler API")
})

export default app
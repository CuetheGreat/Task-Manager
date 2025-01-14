import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/tasks.js'


const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api', taskRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to the Task Sceduler API")
})

export default app

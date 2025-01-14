import express from 'express'

const app = express()

app.get('/', (req,res) => {
    res.send("Welcome to the Task Sceduler API")
})

export default app
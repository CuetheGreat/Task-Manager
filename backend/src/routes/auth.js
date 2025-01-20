import bcrypt from 'bcryptjs'
import 'dotenv/config'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

const registerValidation = [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('username').notEmpty().withMessage('Username is required')
]

router.post('/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: "Validation Failed",
            details: errors.array().reduce((acc, err) => {
                acc[err.param] = err.msg;
                return acc;
            }, {}),
        });

    }

    const { username, password, email } = req.body
    try {
        const userExists = await User.findOne({ where: { email } })
        if (userExists) return res.status(400).json({ error: `User with email:${email} already exists` })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ username, password: hashedPassword, email })
        return res.status(201).json({ message: "User registered successfully.", user: newUser })
    } catch (e) {
        return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });

    }
})

const loginAttempLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again after 5 minutes',
});

const loginValidator = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
]

router.post('/login', loginAttempLimit, loginValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: "Validation Failed",
            details: errors.array().reduce((acc, err) => {
                acc[err.param] = err.msg;
                return acc;
            }, {}),
        });

    }

    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(400).json({ error: "Invalid Login" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ error: "Password does not match. Try again" })
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' })
        return res.status(200).json({ message: "Login Successfull", token })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})

export default router

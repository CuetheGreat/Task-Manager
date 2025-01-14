import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body
    try {
        const userExists = await User.findOne({ where: { email } })
        if (userExists) return res.status(400).json({ error: `User with email:${email} already exists` })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ username, password: hashedPassword, email })
        res.status(201).json({ message: "User registered successfully.", user: newUser })
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.findOne({where: {email}})
        if(!user) return res.status(400).json({error: "Invalid Login"})
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({error: "Password does not match. Try again" })
            const token = jwt.sign({ id:user.id, email: user.email}, JWT_SECRET, {expiresIn: '2h'})
        res.status(200).json({message: "Login Successfull", token})
    }catch(e){
        res.status(500).json({error: e.message})
    }
})

export default router
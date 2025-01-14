import jwt from 'jsonwebtoken'
import 'dotenv/config'


const authMiddleware = (req,res,next) => {
    const token = req.header('Authorization')?.replace('Bearer', '').trim()
    if (!token) return res.status(401).json({message: "Access denied. Please log in"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next()
    }catch(e){
        console.error(e)
        return res.status(401).json({ message: "Invalid or expired token"})
    }
}

export default authMiddleware
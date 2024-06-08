const jwt = require('jsonwebtoken');
import User from '../models/User';

export const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'No token Provided!'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user) {
            return res.status(401).json({ message: 'User not found'});
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token '});
    }
}
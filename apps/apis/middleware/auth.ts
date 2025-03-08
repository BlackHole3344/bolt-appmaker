import type { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import type { token_payload} from '../types/token';

const Auth  = () : RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Authentication token is missing' });
        return 
    }
    try {
// Replace with your actual secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as token_payload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid authentication token' });
        return 
    }   
};
}

export default Auth;
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next)=>{
    const authorization = req.get('authorization');
    const [scheme, token] = authorization?.split(' ') ?? [];

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'A bearer token is required' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof payload !== 'object' || typeof payload.sub !== 'string') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        req.user = { id: payload.sub };
        return next();
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticate;

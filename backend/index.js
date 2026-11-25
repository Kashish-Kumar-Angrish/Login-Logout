import express from 'express'
import { config } from 'dotenv'
import connectDb from './db/db.js';
import cors from 'cors'
import router from './routes/AuthRouter.js';

config();
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required. Add it to backend/.env before starting the server.');
}
await connectDb();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.get('/', (req, res)=>{
    res.json({ message: 'LoginLogout API is running' });
});
app.use('/auth',router);

app.use((req, res)=>{
    res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next)=>{
    if (res.headersSent) {
        return next(error);
    }
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Request body must contain valid JSON' });
    }
    console.error('Request failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
})
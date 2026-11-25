import express from 'express'
import { loginValidation, signUpValidation } from '../middlewares/Validation.js';
import { getCurrentUser, login, logout, signup } from '../controllers/AuthController.js';
import authenticate from '../middlewares/Authenticate.js';

const router = express.Router();

router.post('/signup', signUpValidation, signup);
router.post('/login', loginValidation, login);
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', authenticate, logout);

export default router
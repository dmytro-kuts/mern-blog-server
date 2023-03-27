import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { registerValidation, loginValidation } from '../validations.js';

const router = new Router();

// Register
router.post('/register', registerValidation, handleValidationErrors, register);

// Login
router.post('/login', loginValidation, handleValidationErrors, login);

// Get me
router.get('/me', checkAuth, getMe);

export default router;

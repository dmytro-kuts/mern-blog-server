import { Router } from 'express';
import { createLike } from '../controllers/likes.js';
import { checkAuth } from '../utils/index.js';

const router = new Router();

// Create like
router.get('/:id', checkAuth, createLike);

export default router;

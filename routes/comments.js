import { Router } from 'express';
import { createComment } from '../controllers/comments.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';

const router = new Router();

// Create Post
router.post('/:id', checkAuth, createComment);

export default router;

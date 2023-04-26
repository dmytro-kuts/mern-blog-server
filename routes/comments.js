import { Router } from 'express';
import { createComment, deleteComment } from '../controllers/comments.js';
import { checkAuth} from '../utils/index.js';

const router = new Router();

// Create Comment
router.post('/:id', checkAuth, createComment);

// Delete post
router.delete('/:id', checkAuth, deleteComment);

export default router;

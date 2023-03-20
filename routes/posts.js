import { Router } from 'express';
import { createPost, getAllPost, getPostById } from '../controllers/posts.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Create Post
router.post('/', checkAuth, createPost);

// Get All Posts
router.get('/', getAllPost);

// Get post by id
router.get('/:id', getPostById);

export default router;

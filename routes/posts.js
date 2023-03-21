import { Router } from 'express';
import {
  createPost,
  getAllPost,
  getMyPosts,
  getPostById,
  deletePost,
} from '../controllers/posts.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Create Post
router.post('/', checkAuth, createPost);

// Get All Posts
router.get('/', getAllPost);

// Get my posts
router.get('/all/me', checkAuth, getMyPosts);

// Get post by id
router.get('/:id', getPostById);

// Delete post
router.delete('/:id', checkAuth, deletePost);

export default router;

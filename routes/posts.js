import { Router } from 'express';
import {
  createPost,
  getAllPost,
  getMyPosts,
  getPostById,
  deletePost,
  updatePost,
  getPostComments,
} from '../controllers/posts.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { postCreateValidation } from '../validations.js';

const router = new Router();

// Create Post
router.post('/', checkAuth, postCreateValidation,handleValidationErrors, createPost);

// Get All Posts
router.get('/', getAllPost);

// Get my posts
router.get('/all/me', checkAuth, getMyPosts);

// Get post by id
router.get('/:id', getPostById);

// Update post
router.put('/:id', checkAuth, updatePost);

// Delete post
router.delete('/:id', checkAuth, deletePost);

// Get Post Comments
router.get('/comments/:id', getPostComments);

export default router;

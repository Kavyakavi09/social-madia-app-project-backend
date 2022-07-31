import express from 'express';
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPost);
router.post('/create', auth, createPost);
// router.get('/:id', getPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.put('/:id/likePost', auth, likePost);

export default router;

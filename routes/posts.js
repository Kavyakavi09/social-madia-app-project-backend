import express from 'express';
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPost);
router.post('/create', createPost);
// router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;

import express from 'express';
import { onlyAuthorized } from '@/domains/user/middlewares/only-authorized.middleware';
import { getAllMyPosts, getMyPost, getPost, getPosts } from './post.controllers';

export const router = express.Router();

router.get('/my-post/:id',
  onlyAuthorized,
  getMyPost,
);
router.get('/my-post',
  onlyAuthorized,
  getAllMyPosts,
);

router.get('/:id',
  getPost
);
router.get('/',
  getPosts
);
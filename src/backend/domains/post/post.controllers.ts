import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '@/errors/ApiError';
import { Store_Post } from './post.model';
import type { Post } from './post.types';

// Protected by Auth Route
export const getMyPost = async (req: Request, res: Response, next: NextFunction) => {

  // ensure we have "user"
  if (typeof req.user === 'undefined') {
    return next(ApiError.unexpected());
  }

  // extract author id from currently authed user
  const authorId = req.user.id;

  // extract request data and ensure request is valid
  const postId = req.query.postId;
  if (typeof postId !== 'string' || postId === '') {
    return next(ApiError.badRequest('Post Id is required in "id" field !'));
  }

  // get post from db of that author
  const post = await Store_Post.findOne({ where: { authorId, id: postId } });
  if (typeof post === 'undefined') {
    return next(ApiError.notFound());
  }

  // return to client
  res.json({
    post
  } as { post: Post; });

};

// Protected by Auth Route
export const getAllMyPosts = async (req: Request, res: Response, next: NextFunction) => {

  // ensure we have "user"
  if (typeof req.user === 'undefined') {
    return next(ApiError.unexpected());
  }

  // extract author id from currently authed user
  const authorId = req.user.id;

  // get posts from db of that author
  const posts = await Store_Post.findMany({ where: { authorId } });

  // return to client
  res.json({
    posts
  } as { posts: Post[]; });

};


// Public Route
export const getPost = async (req: Request, res: Response, next: NextFunction) => {

  // parse request and ensure is valid
  const { id } = req.params;
  if (typeof id !== 'string' || id === '') {
    return next(ApiError.badRequest('Post id is required !'));
  }

  // get post from db
  const post = await Store_Post.findOne({ where: { id } });
  if (typeof post === 'undefined') {
    return next(ApiError.notFound());
  }

  // return to client
  res.json({
    post
  } as { post: Post | undefined; });

};
// Public Route
export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  // get posts from db of that author
  const posts = await Store_Post.findMany({ where: {} });

  // return to client
  res.json({
    posts
  } as { posts: Post[]; });

};
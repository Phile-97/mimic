import { createAction, props } from '@ngrx/store';
import { PostsEntity } from './posts.models';


export const getAllPosts = createAction(
  '[Posts/API] Get All Posts'
);

export const getAllPostsSuccess = createAction(
  '[Posts/API] Get All Posts Success',
  props<{ posts: PostsEntity[] }>()
);

export const getAllPostsFailure = createAction(
  '[Posts/API] Get All Posts Failure',
  props<{ error: any }>()
);

export const getPostById = createAction(
  '[Posts/API] Get Post By Id',
  props<{ postId: string }>()
);

export const getPostByIdSuccess = createAction(
  '[Posts/API] Get Post By Id Success',
  props<{ post: PostsEntity }>()
);

export const getPostByIdFailure = createAction(
  '[Posts/API] Get Post By Id Failure',
  props<{ error: any }>()
);

export const createPost = createAction(
  '[Posts/API] Create Post',
  props<{ post: PostsEntity }>()
);

export const createPostSuccess = createAction(
  '[Posts/API] Create Post Success',
  props<{ post: PostsEntity }>()
);

export const createPostFailure = createAction(
  '[Posts/API] Create Post Failure',
  props<{ error: any }>()
);

export const updatePost = createAction(
  '[Posts/API] Update Post',
  props<{ post: PostsEntity }>()
);

export const updatePostSuccess = createAction(
  '[Posts/API] Update Post Success',
  props<{ post: PostsEntity }>()
);

export const updatePostFailure = createAction(
  '[Posts/API] Update Post Failure',
  props<{ error: any }>()
);

export const deletePost = createAction(
  '[Posts/API] Delete Post',
  props<{ postId: string }>()
);

export const deletePostSuccess = createAction(
  '[Posts/API] Delete Post Success'
);

export const deletePostFailure = createAction(
  '[Posts/API] Delete Post Failure',
  props<{ error: any }>()
);

export const upvotePost = createAction(
  '[Posts/API] Upvote Post',
  props<{ postId: string }>()
);

export const upvotePostSuccess = createAction(
  '[Posts/API] Upvote Post Success'
);

export const upvotePostFailure = createAction(
  '[Posts/API] Upvote Post Failure',
  props<{ error: any }>()
);


export const downvotePost = createAction(
  '[Posts/API] Downvote Post',
  props<{ postId: string }>()
);

export const downvotePostSuccess = createAction(
  '[Posts/API] Downvote Post Success'
);

export const downvotePostFailure = createAction(
  '[Posts/API] Downvote Post Failure',
  props<{ error: any }>()
);
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import { PostsEntity } from './posts.models';
import { ClrLoadingState } from '@clr/angular';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState extends EntityState<PostsEntity> {
  selectedId?: string | number; // which Posts record has been selected
  loaded: boolean; // has the Posts list been loaded
  loading: boolean;
  selectedPost: PostsEntity | null;
  total: number;
  btnState: ClrLoadingState;
  error?: string | null; // last known error (if any)
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: PostsState;
}

export const postsAdapter: EntityAdapter<PostsEntity> =
  createEntityAdapter<PostsEntity>();

export const initialPostsState: PostsState = postsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  loading: false,
  error: null,
  total: 0,
  btnState: ClrLoadingState.DEFAULT,
  selectedPost: null
});

const reducer = createReducer(
  initialPostsState,
  on(PostsActions.getAllPosts, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(PostsActions.getAllPostsSuccess, (state, { posts }) =>
    postsAdapter.setAll(posts, { 
      ...state, 
      loaded: true,
      loading: false,
      error: null,
      total: posts.length
     })
  ),
  on(PostsActions.getAllPostsFailure, (state, { error }) => ({ 
    ...state, 
    loaded: false,
    loading: false,
    error: error 
  })),

  on(
    PostsActions.createPost,
    PostsActions.getPostById,
    PostsActions.deletePost,
    PostsActions.updatePost,
    PostsActions.downvotePost,
    PostsActions.upvotePost,
    (state) => ({
      ...state,
      loaded: false,
      loading: false,
      error: null,
      btnState: ClrLoadingState.LOADING,
    })
  ),

  on(
    PostsActions.getPostByIdSuccess,
     (state, { post }) => ({
    ...state,
    selectedPost: post,
    loaded: true,
    loading: false,
    error: null
  })),

  on(
    PostsActions.createPostSuccess,
    PostsActions.deletePostSuccess,
    PostsActions.updatePostSuccess,
    PostsActions.downvotePostSuccess,
    PostsActions.upvotePostSuccess,
    (state) => ({
      ...state,
      loaded: true,
      loading: false,
      error: null,
      btnState: ClrLoadingState.SUCCESS,
    })
  ),

  on(
    PostsActions.createPostFailure,
    PostsActions.getPostByIdFailure,
    PostsActions.deletePostFailure,
    PostsActions.updatePostFailure,
    PostsActions.downvotePostFailure,
    PostsActions.upvotePostFailure,
    (state, {error}) => ({
      ...state,
      loaded: false,
      loading: false,
      error: error,
      btnState: ClrLoadingState.ERROR,
    })
  ),
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return reducer(state, action);
}

import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import * as PostsFeature from './posts.reducer';
import * as PostsSelectors from './posts.selectors';
import { PostsEntity } from './posts.models';

@Injectable()
export class PostsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(PostsSelectors.selectPostsLoaded));
  allPosts$ = this.store.pipe(select(PostsSelectors.selectAllPosts));
  selectedPosts$ = this.store.pipe(select(PostsSelectors.selectEntity));
  selectedPost$ = this.store.pipe(select(PostsSelectors.selectSelectedPost));
  loading$ = this.store.pipe(select(PostsSelectors.selectPostsLoadingState));
  totalPosts$ = this.store.pipe(select(PostsSelectors.selectTotalPosts));
  btnState$ = this.store.pipe(select(PostsSelectors.selectBtnState));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  getAllPosts() {
    this.store.dispatch(PostsActions.getAllPosts());
  }

  getPostById(postId: string) {
    this.store.dispatch(PostsActions.getPostById({postId}));
  }

  createPost(post: PostsEntity) {
    this.store.dispatch(PostsActions.createPost({post}));
  }

  updatePost(post: PostsEntity) {
    this.store.dispatch(PostsActions.updatePost({post}));
  }

  deletePost(postId: string) {
    this.store.dispatch(PostsActions.deletePost({postId}));
  }

  upvotePost(postId: string) {
    this.store.dispatch(PostsActions.upvotePost({postId}));
  }

  downvotePost(postId: string) {
    this.store.dispatch(PostsActions.downvotePost({postId}));
  }
}

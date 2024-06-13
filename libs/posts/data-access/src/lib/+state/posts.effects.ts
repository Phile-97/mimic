import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, exhaustMap, mergeMap, tap } from 'rxjs';
import * as PostsActions from './posts.actions';
import { PostsService } from '../services/posts.service';
import { Utilities } from '@mimic/shared/utils';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);

  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getAllPosts),
      exhaustMap(() =>
        this.postsService.getAllPosts().pipe(
          map((posts) => PostsActions.getAllPostsSuccess({ posts })),
          catchError((error) =>
            of(PostsActions.getAllPostsFailure({ error }))
          )
        )
      )
    )
  );
  getPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getPostById),
      mergeMap((action) =>
        this.postsService.getPostById(action.postId).pipe(
          map((post) => PostsActions.getPostByIdSuccess({post})),
          catchError((error) => of(PostsActions.getPostByIdFailure({ error })))
        )
      )
    )
  );


  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPost),
      mergeMap((action) =>
        this.postsService.createPost(action.post).pipe(
          map((post) => PostsActions.createPostSuccess({post})),
          catchError((error) => of(PostsActions.createPostFailure({ error })))
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.updatePost),
      mergeMap((action) =>
        this.postsService.updatePost(action.post).pipe(
          map((post) => PostsActions.updatePostSuccess({post})),
          catchError((error) => of(PostsActions.updatePostFailure({ error })))
        )
      )
    )
  );


  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deletePost),
      mergeMap((action) =>
        this.postsService.deletePost(action.postId).pipe(
          map(() => PostsActions.deletePostSuccess()),
          catchError((error) => of(PostsActions.deletePostFailure({ error })))
        )
      )
    )
  );

  upVotePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.upvotePost),
      mergeMap((action) =>
        this.postsService.upVotePost(action.postId).pipe(
          map(() => PostsActions.upvotePostSuccess()),
          catchError((error) => of(PostsActions.upvotePostFailure({ error })))
        )
      )
    )
  );

  downVotePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.downvotePost),
      mergeMap((action) =>
        this.postsService.downVotePost(action.postId).pipe(
          map(() => PostsActions.downvotePostSuccess()),
          catchError((error) => of(PostsActions.downvotePostFailure({ error })))
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          PostsActions.createPostSuccess,
          PostsActions.deletePostSuccess,
          PostsActions.updatePostSuccess,
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );


  constructor(
    //private actions$: Actions,
    private postsService: PostsService,

  ) {}
}

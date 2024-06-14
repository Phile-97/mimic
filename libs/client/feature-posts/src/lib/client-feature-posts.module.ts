import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@mimic/shared/ui';
import { PostsDataAccessModule, PostsFacade } from '@mimic/posts/data-access';
import { PostsUiModule } from '@mimic/posts/ui';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { PostResolver } from './resolvers/post.resolver';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    PostsDataAccessModule,
    PostsUiModule,
    RouterModule.forChild([
      { path: '', component: ListPostsComponent },
      {
        path: 'create',
        component: CreatePostComponent,
      },
      {
        path: 'view/:postId',
        resolve: {
          post: PostResolver,
        },
        component: ViewPostComponent,
      },
      {
        path: 'edit/:postId',
        resolve: {
          post: PostResolver,
        },
        component: UpdatePostComponent,
      },
    ])
  ],
  declarations: [
    CreatePostComponent,
    DeletePostComponent,
    UpdatePostComponent,
    ListPostsComponent,
    ViewPostComponent,
  ],
})
export class ClientFeaturePostsModule {}

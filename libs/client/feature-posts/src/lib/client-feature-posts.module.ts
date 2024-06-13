import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@mimic/shared/ui';
import { PostsDataAccessModule } from '@mimic/posts/data-access';
import { PostsUiModule } from '@mimic/posts/ui';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

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
      { path: '', component: ListPostsComponent }
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

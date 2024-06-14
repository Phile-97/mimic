import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListUiComponent } from './posts-list-ui/posts-list-ui.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@mimic/shared/ui';
import { ClarityModule } from '@clr/angular';
import { TopPostsUiComponent } from './top-posts-ui/top-posts-ui.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    ClarityModule,
    SharedUiModule,
  ],
  declarations: [
    PostsListUiComponent,
    PostFormComponent,
    PostDetailsComponent,
    TopPostsUiComponent,
  ],
  exports: [PostsListUiComponent, PostFormComponent, PostDetailsComponent, TopPostsUiComponent],
})
export class PostsUiModule {}

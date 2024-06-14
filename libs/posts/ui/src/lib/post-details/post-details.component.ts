import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostsEntity } from '@mimic/posts/data-access';

@Component({
  selector: 'lib-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent{
  @Input() post!: PostsEntity;
  @Input() isAuthor!: boolean;
  @Output() updateSelected = new EventEmitter<PostsEntity>();
  @Output() deleteSelected = new EventEmitter<PostsEntity>();
  @Output() upVoteSelected = new EventEmitter<PostsEntity>();
  @Output() downVoteSelected = new EventEmitter<PostsEntity>();
 
}

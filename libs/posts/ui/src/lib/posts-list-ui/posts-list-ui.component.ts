import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { PostsEntity } from '@mimic/posts/data-access';

@Component({
  selector: 'lib-posts-list-ui',
  templateUrl: './posts-list-ui.component.html',
  styleUrl: './posts-list-ui.component.scss',
})
export class PostsListUiComponent {
  @Input() postsList!: PostsEntity[] | null;
  @Input() total!: number | null;
  @Input() loading!: boolean | null;
  @Input() placeholderMessage!: string;
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<PostsEntity>();
  @Output() deleteSelected = new EventEmitter<PostsEntity>();
  @Output() upVotePost = new EventEmitter<PostsEntity>();
  @Output() downVotePost = new EventEmitter<PostsEntity>();
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { PostsEntity } from '@mimic/posts/data-access';

@Component({
  selector: 'lib-top-posts-ui',
  templateUrl: './top-posts-ui.component.html',
  styleUrl: './top-posts-ui.component.scss',
})
export class TopPostsUiComponent {
  @Input() postsList!: PostsEntity[] | null;
  @Input() loading!: boolean | null;
  @Input() placeholderMessage!: string;
  @Output() viewSelected = new EventEmitter<PostsEntity>();
}

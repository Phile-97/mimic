import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { PostsEntity } from '@mimic/posts/data-access';

@Component({
  selector: 'lib-posts-list-ui',
  templateUrl: './posts-list-ui.component.html',
  styleUrl: './posts-list-ui.component.scss',
})
export class PostsListUiComponent {
  @Input() postsList!: PostsEntity[] ;
  @Input() total!: number | null;
  @Input() loading!: boolean | null;
  @Input() placeholderMessage!: string;
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<PostsEntity>();
  @Output() deleteSelected = new EventEmitter<PostsEntity>();
  @Output() viewSelected = new EventEmitter<PostsEntity>();
  @Output() upVotePost = new EventEmitter<PostsEntity>();
  @Output() downVotePost = new EventEmitter<PostsEntity>();

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  handlePageChange(event: number): void {
    const prev = this.page;
    this.page = event;
    this.updatedState.emit({
      page: {
        from: prev,
        to: this.page,
        size: this.pageSize,
        current: this.page + 1,
      },
    });
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.updatedState.emit({
      page: {
        from: 0,
        to: this.pageSize,
        size: this.pageSize,
        current: this.page,
      },
    });
  }
}

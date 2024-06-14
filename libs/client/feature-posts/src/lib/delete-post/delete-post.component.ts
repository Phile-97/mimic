import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { PostsEntity, PostsFacade } from '@mimic/posts/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.scss',
})
export class DeletePostComponent implements OnDestroy{
  @Output() closeModal = new EventEmitter<boolean>();
  @Input() selectedPost!: PostsEntity;

  public loadedSubscription = new Subscription();

  constructor(public postsFacade: PostsFacade) {}

  onSubmit() {
    this.postsFacade.deletePost(this.selectedPost.id.toString());
    this.loadedSubscription = this.postsFacade.loaded$.subscribe(
      (res) => {
        return res ? this.closeModal.emit(true) : null;
      }
    );
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
  }
}

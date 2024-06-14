import { Component, OnDestroy } from '@angular/core';
import { PostsFacade } from '@mimic/posts/data-access';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'lib-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent implements OnDestroy {
  public loadedSubscription = new Subscription();

  constructor(
    public postsFacade: PostsFacade,
    private location: Location,
  ) {}

  async onSubmit(post: any){
    this.postsFacade.createPost(post);
    this.loadedSubscription = this.postsFacade.loaded$.subscribe((res) => 
    res ? this.location.back() : null
    );
  }

  public goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.loadedSubscription.unsubscribe();
  }
}

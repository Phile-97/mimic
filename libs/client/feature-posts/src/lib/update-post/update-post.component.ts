import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PostsEntity, PostsFacade } from '@mimic/posts/data-access';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-update-post',
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss',
})
export class UpdatePostComponent implements OnInit, OnDestroy {
  public selectedPost: PostsEntity | undefined;
  public data: any;

  public loadedSubscription = new Subscription();
  constructor(
    public postsFacade: PostsFacade,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private location: Location,
  ) {}


  ngOnInit(): void {
    this.data = this.route.snapshot.data;
    this.selectedPost = this.data.post;
    this.cdr.detectChanges();
  }

  async onSubmit(post: any){
    this.postsFacade.updatePost(post);
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

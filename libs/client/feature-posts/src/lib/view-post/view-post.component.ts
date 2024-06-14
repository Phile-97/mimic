import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsEntity, PostsFacade, PostsService } from '@mimic/posts/data-access';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss',
})
export class ViewPostComponent implements OnInit, OnDestroy {
  selectedPost!: PostsEntity;
  data: any;
  isAuthor=false;
  public isUpVote!: boolean;
  public isDelete!: boolean;
  public isDownVote!: boolean;
  public showLoginDialog = false;
  public isLoggedIn = false;
  public loadedSubscription = new Subscription();

  constructor(
    private postsService: PostsService,
    private postsFacade: PostsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data;
    this.selectedPost = this.data.post;
    if (!localStorage.getItem('accessToken')) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
    if(localStorage.getItem('username') == this.selectedPost.owner.username){
      this.isAuthor = true;
    }

  }

  updatePost(post: any) {
    this.router.navigate(['../../edit', post.id], {
      relativeTo: this.route,
    });
  }

  deleteSelected(post: any) {
    this.selectedPost = post;
    this.isDelete = true;
  }

  upVoteSelected(post: any) {
    if(this.isLoggedIn){
      this.selectedPost = post;
      this.isUpVote = true;
      this.postsFacade.upvotePost(this.selectedPost.id.toString());
      this.loadedSubscription = this.postsFacade.loaded$.subscribe((res) => 
        res ? this.getPost(this.selectedPost.id.toString()) : null
        );
      
    }else{
      this.showLoginDialog = true;
    }
    

  }

  downVoteSelected(post: any) {
    if(this.isLoggedIn){
      this.selectedPost = post;
      this.isDownVote = true;
      this.postsFacade.downvotePost(this.selectedPost.id.toString());
      this.loadedSubscription = this.postsFacade.loaded$.subscribe((res) => 
        res ? this.getPost(this.selectedPost.id.toString()) : null
        );
    }else{
      this.showLoginDialog = true;
    }

  }

  async getPost(postId: string){
     await this.postsService.getPostById(postId).subscribe(
      (res) => this.selectedPost = res
    );
    this.cdr.detectChanges();

  }

  refresh(isRefresh: any){
    this.isDelete = false;
    this.isUpVote = false;
    this.isDownVote = false;
    return isRefresh ? this.goBack() : null;
  }

  public goBack() {
    this.location.back();
  }

  goToLoginPage(){
    this.router.navigate(['../auth/login']);
  }

  ngOnDestroy(): void {
    this.loadedSubscription.unsubscribe();
  }

}

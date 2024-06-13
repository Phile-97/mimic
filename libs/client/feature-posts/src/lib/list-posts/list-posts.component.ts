import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostsEntity, PostsFacade } from '@mimic/posts/data-access';

@Component({
  selector: 'lib-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss',
})
export class ListPostsComponent implements OnInit{
  public placeholderMessage!: string;
  public isUpdate!: boolean;
  public isCreate!: boolean;
  public isDelete!: boolean;
  public isChangeCompanyStatus!: boolean;
  public selectedPost!: PostsEntity;

  constructor(
    public postsFacade: PostsFacade,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  public getPosts(){
    this.postsFacade.getAllPosts();
  }

  refresh(isRefresh: any){
    this.isUpdate = false;
    this.isCreate = false;
    this.isDelete = false;
    return isRefresh ? this.getPosts() : null;
  }

  updatePost(post: any) {
    this.selectedPost = post;
    this.isUpdate = true;
  }

  deletePost(post: any) {
    this.selectedPost = post;
    this.isDelete = true;
  }

  upVotePost(post: any) {
    this.selectedPost = post;
    this.isDelete = true;
  }

  downVotePost(post: any) {
    this.selectedPost = post;
    this.isDelete = true;
  }
}

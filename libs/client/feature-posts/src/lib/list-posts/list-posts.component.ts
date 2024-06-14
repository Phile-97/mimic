import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsEntity, PostsFacade } from '@mimic/posts/data-access';

@Component({
  selector: 'lib-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss',
})
export class ListPostsComponent implements OnInit{
  public placeholderMessage!: string;
  public selectedPost!: PostsEntity;

  constructor(
    public postsFacade: PostsFacade,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  public getPosts(){
    this.postsFacade.getAllPosts();
  }

  refresh(isRefresh: any){
    return isRefresh ? this.getPosts() : null;
  }

  viewSelectedPost(post: any) {
    this.router.navigate(['../posts/view', post.id], {
      relativeTo: this.route,
    });
  }
}

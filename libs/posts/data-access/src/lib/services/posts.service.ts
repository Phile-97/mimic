import { Injectable } from '@angular/core';
import { PostsApiService } from '@mimic/shared/data-access';
import { PostsEntity } from '../+state/posts.models';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  
  constructor(
    private apiService: PostsApiService
  ) { }

  getAllPosts(){
    return this.apiService.get<PostsEntity[]>(
      `/posts`
    );
  }

  getPostById(postId: string){
    return this.apiService.get<PostsEntity>(
      `/posts/${postId}`
    );
  }

  createPost(post: PostsEntity){
    return this.apiService.post<PostsEntity>(
      `/posts`,
      post
    );
  }

  updatePost(post: PostsEntity){
    return this.apiService.put<PostsEntity>(
      `/posts/${post.id}`,
      post
    );
  }

  deletePost(postId: string){
    return this.apiService.delete(
      `/posts/${postId}`
    );
  }

  upVotePost(postId: string){
    return this.apiService.put(
      `/posts/${postId}/upvote`
    );
  }

  downVotePost(postId: string){
    return this.apiService.put(
      `/posts/${postId}/downvote`
    );
  }

}

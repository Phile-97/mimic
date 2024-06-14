import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PostsFacade, PostsService } from '@mimic/posts/data-access';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<any> {

    constructor(
        private postsService: PostsService
      ) {}
    
      resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const entityId = route.paramMap.get('postId');
        return this.postsService.getPostById(entityId!);
      }
}
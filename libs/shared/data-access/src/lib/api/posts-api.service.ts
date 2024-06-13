import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService extends ApiService {

  constructor(http: HttpClient, @Inject('BaseUrl') baseUrl: string) {
    super(http);
    this.server = `${baseUrl}`;
  }
}

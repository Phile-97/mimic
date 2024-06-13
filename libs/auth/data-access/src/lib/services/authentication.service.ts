import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEntity, LoginResponse } from '../+state/auth.models';
import { PostsApiService } from '@mimic/shared/data-access';
import { UserDataService } from '@mimic/users/data-access';
import { CookieService } from 'ngx-cookie-service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private apiService: PostsApiService,
    private userData: UserDataService,
    private cookieService: CookieService
  ) {}

  login(request: AuthEntity) {
    localStorage.setItem('username', request.username);
    const httpParams = new HttpParams();
    const body = new URLSearchParams();
    body.set('username', request.username);
    body.set('password', request.password);
    body.set('grant_type', request.grant_type);
    body.set('scope', request.scope);
    body.set('client_id', request.client_id);
    body.set('client_secret', request.client_secret);
    return this.apiService.post<LoginResponse>(
      `/auth/login`,
      body,
      httpParams,
      'form-data'
    );
  }

  logout() {
    this.userData.setUserProfile(null);
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['auth/login']);
  }
}

import { Injectable } from '@angular/core';
import { PostsApiService } from '@mimic/shared/data-access';
import { RegisterUserContext, UsersEntity } from '../+state/users.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: PostsApiService) {}

  getAllUsers() {
    return this.apiService.get<UsersEntity[]>(`/users`);
  }

  getUserProfile(username: string) {
    return this.apiService.get<UsersEntity>(`/users/${username}`);
  }

  registerUser(user: RegisterUserContext) {
    return this.apiService.post<UsersEntity>(`/auth/register`, user);
  }

  updateUser(user: RegisterUserContext) {
    return this.apiService.put<UsersEntity>(`/users/${user.username}`, user);
  }
}

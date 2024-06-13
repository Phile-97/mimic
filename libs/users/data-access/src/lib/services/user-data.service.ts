import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsersEntity } from '../+state/users.models';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userProfileSubject = new BehaviorSubject<UsersEntity | null>(null);

  public getUserProfile() {
    return this.userProfileSubject.asObservable();
  }

  public setUserProfile(data: UsersEntity | null) {
    this.userProfileSubject.next(data);
  }
}

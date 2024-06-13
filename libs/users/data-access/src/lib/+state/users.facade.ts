import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';
import { RegisterUserContext } from './users.models';

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(UsersSelectors.selectUsersLoaded));
  allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));
  loading$ = this.store.pipe(select(UsersSelectors.selectUsersLoadingState));
  totalUsers$ = this.store.pipe(select(UsersSelectors.selectTotalUsers));
  btnState$ = this.store.pipe(select(UsersSelectors.selectBtnState));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  registerUser(userDetails: RegisterUserContext) {
    this.store.dispatch(UsersActions.registerUser({userDetails}));
  }

  updateUser(userDetails: RegisterUserContext) {
    this.store.dispatch(UsersActions.updateUser({userDetails}));
  }

  getAllUsers() {
    this.store.dispatch(UsersActions.getAllUsers());
  }

  getUserByUsername(username: string) {
    this.store.dispatch(UsersActions.getUserByUsername({username}));
  }
}

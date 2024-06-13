import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import { AuthEntity } from './auth.models';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(AuthSelectors.selectAuthLoaded));
  allAuth$ = this.store.pipe(select(AuthSelectors.selectAllAuth));
  authBtnState$ = this.store.pipe(select(AuthSelectors.selectAuthBtnState));



  login(request: AuthEntity) {
    this.store.dispatch(AuthActions.login({request}));
  }

  logout() {
    this.store.dispatch(AuthActions.Logout());
  }
}

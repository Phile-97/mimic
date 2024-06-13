import { createAction, props } from '@ngrx/store';
import { AuthEntity, LoginResponse } from './auth.models';

export const login = createAction(
  '[Auth/API] login',
  props<{ request: AuthEntity}>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ response: LoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);

export const Logout = createAction('[Auth/API]  Logout');
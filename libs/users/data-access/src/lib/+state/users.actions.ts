import { createAction, props } from '@ngrx/store';
import { RegisterUserContext, UsersEntity } from './users.models';

export const getAllUsers = createAction('[Users/API] Get All Users');

export const getAllUsersSuccess = createAction(
  '[Users/API] Get All Users Success',
  props<{ users: UsersEntity[] }>()
);

export const getAllUsersFailure = createAction(
  '[Users/API] Get All Users',
  props<{ error: any }>()
);

export const getUserByUsername = createAction(
  '[Users/API] Get User By Username',
  props<{ username: string }>()
);

export const getUserByUsernameSuccess = createAction(
  '[Users/API] Get User By Username Success',
  props<{ user: UsersEntity }>()
);

export const getUserByUsernameFailure = createAction(
  '[Users/API] Get User By Username Failure',
  props<{ error: any }>()
);

export const registerUser = createAction(
  '[Users/API] Register User',
  props<{ userDetails: RegisterUserContext }>()
);

export const registerUserSuccess = createAction(
  '[Users/API] Register User Success',
  props<{ user: UsersEntity }>()
);

export const registerUserFailure = createAction(
  '[Users/API] Register User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[Users/API] Update User',
  props<{ userDetails: RegisterUserContext }>()
);

export const updateUserSuccess = createAction(
  '[Users/API] Update User Success',
  props<{ user: UsersEntity }>()
);

export const updateUserFailure = createAction(
  '[Users/API] Update User Failure',
  props<{ error: any }>()
);
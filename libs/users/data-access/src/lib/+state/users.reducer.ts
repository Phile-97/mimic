import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';
import { ClrLoadingState } from '@clr/angular';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<UsersEntity> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  loading: boolean;
  error?: string | null; // last known error (if any)
  total: number;
  btnState: ClrLoadingState;
  selectedUser: UsersEntity | null;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> =
  createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  loading: false,
  error: null,
  total: 0,
  btnState: ClrLoadingState.DEFAULT,
  selectedUser: null,
});

const reducer = createReducer(
  initialUsersState,
  on(
    UsersActions.getAllUsers,
    UsersActions.getUserByUsername,
    (state) => ({
      ...state,
      error: null,
      loading: true,
      loaded: false,
    })
  ),
  on(
    UsersActions.registerUser,
    UsersActions.updateUser,
    (state) => ({
      ...state,
      btnState: ClrLoadingState.LOADING,
      error: null,
      loaded: false,
      loading: true,
    })
  ),
  on(
    UsersActions.getAllUsersSuccess,
    (state, { users }) =>
      usersAdapter.setAll(users, {
        ...state,
        loading: false,
        loaded: true,
      })
  ),
  
  on(
    UsersActions.getUserByUsernameSuccess,
     (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    selectedUser: user,
  })),
  on(
    UsersActions.registerUserSuccess,
    UsersActions.updateUserSuccess,
    (state) => ({
      ...state,
      btnState: ClrLoadingState.SUCCESS,
      loaded: true,
      loading: false,
    })
  ),
  on(
    UsersActions.getUserByUsernameFailure,
    UsersActions.getAllUsersFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),
  on(
    UsersActions.registerUserFailure,
    UsersActions.updateUserFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      loaded: false,
      loading: false,
      btnState: ClrLoadingState.ERROR,
    })
  ),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, INIT, MetaReducer } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';
import { ClrLoadingState } from '@clr/angular';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState extends EntityState<AuthEntity> {
  selectedId?: string | number; // which Auth record has been selected
  loaded: boolean; // has the Auth list been loaded
  loading: boolean;
  error?: string | null; // last known error (if any)
  btnState: ClrLoadingState;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const authAdapter: EntityAdapter<AuthEntity> =
  createEntityAdapter<AuthEntity>();

export const initialAuthState: AuthState = authAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  loading: false,
  error: null,
  btnState: ClrLoadingState.DEFAULT
});

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
    btnState: ClrLoadingState.LOADING
  })),
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
    btnState: ClrLoadingState.SUCCESS
  })
  ),
  on(AuthActions.loginFailure, (state, { error }) => ({
     ...state, 
     loading: false,
     loaded: false,
     error: error,
     btnState: ClrLoadingState.ERROR
    }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}

export function logout(reducer: any) {
  return (state: any, action: any) => {
    if (action != null && action.type === AuthActions.Logout.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [logout];

import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, shareReplay, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) => {
        return this.authService.login(action.request).pipe(
          map((response) => {
            return AuthActions.loginSuccess({ response });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
          shareReplay()
        );
      })
    )
  );

  logoutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.Logout),
        tap(() => this.authService.logout())
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((res) => {
          if (res.response.access_token) {
            this.cookieService.set('accessToken', res.response.access_token);
            localStorage.setItem('accessToken', res.response.access_token);
            this.router.navigate(['posts']);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    //private actions$: Actions,
    private authService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router
  ) {}
}

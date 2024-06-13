import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, tap, mergeMap, map, exhaustMap } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services';
import { UsersService } from '../services/users.service';
import { Utilities } from '@mimic/shared/utils';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);


  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getAllUsers),
      exhaustMap(() =>
        this.usersService.getAllUsers().pipe(
          map((users) => UsersActions.getAllUsersSuccess({ users })),
          catchError((error) => of(UsersActions.getAllUsersFailure({ error })))
        )
      )
    )
  );

  getUserByUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUserByUsername),
      mergeMap((action) =>
        this.usersService.getUserProfile(action.username).pipe(
          map((user) => UsersActions.getUserByUsernameSuccess({user})),
          catchError((error) => of(UsersActions.getUserByUsernameFailure({ error })))
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.registerUser),
      mergeMap((action) =>
        this.usersService.registerUser(action.userDetails).pipe(
          map((user) => UsersActions.registerUserSuccess({user})),
          catchError((error) => of(UsersActions.registerUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap((action) =>
        this.usersService.updateUser(action.userDetails).pipe(
          map((user) => UsersActions.updateUserSuccess({user})),
          catchError((error) => of(UsersActions.updateUserFailure({ error })))
        )
      )
    )
  );

  
  registerUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ...[
            UsersActions.registerUserSuccess,
          ]
        ),
        tap(() => {
          Utilities.displayToast('info','User account created successfully.'),
          this.router.navigate(['../auth/login']);
        }
      )
          
      ),
    { dispatch: false }
  );

  
  onUpdateMyProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ...[
            UsersActions.updateUserSuccess,
          ]
        ),
        tap(() => Utilities.displayToast('success','Your profile has been updated successfully'))
      ),
    { dispatch: false }
  );

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}
}

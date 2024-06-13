import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NEVER, tap, of, catchError, EMPTY } from 'rxjs';
import { UserDataService } from './user-data.service';
import { UsersService } from './users.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolverService  {
  private previousUrl!: string;

  constructor(
    private usersService: UsersService,
    private userDataService: UserDataService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.refresh(state.url)) {
      this.previousUrl = state.url;
      return this.fetchData();
    }

    this.previousUrl = state.url;
    return NEVER;
  }

  private fetchData() {
    const username = localStorage.getItem('username')!;

    return this.usersService.getUserProfile(username).pipe(
      tap((profile) => {
        this.userDataService.setUserProfile(profile);
        return profile ? of(profile) : this.router.navigate(['/auth/login']);
      }),
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return EMPTY;
      })
    );
  }

  private refresh(currentUrl: string): boolean {
    return !this.previousUrl || this.previousUrl === currentUrl;
  }
}

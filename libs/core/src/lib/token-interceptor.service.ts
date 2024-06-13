import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthenticationService } from '@mimic/auth/data-access';
import { Utilities } from '@mimic/shared/utils';
import { Subject, Observable, catchError, throwError, tap, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private authService: any;
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(public inj: Injector) {
    this.authService = inj.get(AuthenticationService);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('accessToken')) {
      request = this.addAuthHeader(request);
    }
    return next.handle(request).pipe(
      // retry(1),
      catchError((error) => this.handleResponseError(error))
    );
  }

  private addAuthHeader(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  }

  handleResponseError(error: HttpErrorResponse, request?: undefined, next?: undefined) {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        Utilities.displayToast(
          'error',
          'Failed to connect, please check your internet connection'
        );
        return throwError(error);
      }

      switch ((<HttpErrorResponse>error).status) {
        case 401:
          console.log('Showing Toast -----',error)
          Utilities.displayToast(
            'error',
              error.error.detail ? error.error.detail : 'Unauthorized'
          );
          //this.logoutUser();
          break;
        case 403:
          Utilities.displayToast(
            'error',
            error.error.detail ? error.error.detail : 'An error has occurred'
          );
          break;
        case 400:
        case 404:
        case 500:
        case 503:
        default:
          Utilities.displayToast(
            'error',
            error.error.detail ? error.error.detail : 'An error has occurred'
          );
          return throwError(error);
      }
    }
    return throwError(error);
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.authService.refreshToken().pipe(
        tap((data) => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next(data);
        }),
        catchError(() => {
          this.refreshTokenInProgress = false;
          this.logoutUser();
          return EMPTY;
        })
      );
    }
  }

  logoutUser() {
    this.authService.logout();
    return EMPTY;
  }
}

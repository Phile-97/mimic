/* eslint-disable @typescript-eslint/ban-types */
import {
  HttpClient,
  HttpParams,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public server: any;

  constructor(private http: HttpClient) {}

  get<T>(
    path: string,
    params: HttpParams = new HttpParams(),
    contentType: string | undefined = undefined
  ): Observable<T> {
    return this.http
      .get<T>(`${this.server}${path}`, {
        headers: this.setHeaders(contentType),
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  post<T>(
    path: string,
    body: Object,
    params: HttpParams = new HttpParams(),
    contentType: string | undefined = undefined
  ): Observable<T> {
    return this.http
      .post<T>(`${this.server}${path}`, body, {
        headers: this.setHeaders(contentType),
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(
    path: string,
    body: Object = {},
    params: HttpParams = new HttpParams(),
    contentType: string | undefined = undefined
  ): Observable<T> {
    return this.http
      .put<T>(`${this.server}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(contentType),
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  patch<T>(
    path: string,
    body: Object = {},
    params: HttpParams = new HttpParams(),
    contentType: string | undefined = undefined
  ): Observable<T> {
    return this.http
      .patch<T>(`${this.server}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(contentType),
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  delete<T>(
    path: any,
    contentType: string | undefined = undefined,
    params: HttpParams = new HttpParams()
  ): Observable<T> {
    return this.http
      .delete<T>(`${this.server}${path}`, {
        headers: this.setHeaders(contentType),
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  file<T>(
    path: string,
    formData: FormData,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .post<T>(`${this.server}${path}`, formData, {
        /* headers: this.setHeaders('multipart-form-data'), */
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  getFile<T>(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http.get<T>(`${this.server}${path}`, {
      params: params,
      responseType: 'blob' as 'json',
    });
  }

  public upload<T>(path: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.request(
      new HttpRequest('POST', `${this.server}${path}`, formData, {
        reportProgress: false,
      })
    );
  }

  private setHeaders(contentType: string | undefined = undefined): HttpHeaders {
    const headersConfig: {[id:string] : string;} = {
      Accept: 'application/json',
    };
    console.log('Content-Type: ',contentType)

    switch (contentType) {
      case 'file':
        break;

      case 'form-data':
        console.log('Content-Typessss: ',contentType)
        headersConfig['Content-Type'] = `application/x-www-form-urlencoded`;
        break;

      case 'multipart-form-data':
        headersConfig['Content-Type'] = `multipart/form-data`;
        break;

      default:
        headersConfig['Content-Type'] = `application/json`;
        break;
    }

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: Error) {
    return throwError(error);
  }
}

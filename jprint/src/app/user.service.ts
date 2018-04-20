import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class UserService {

  auth: string = '';

  constructor(
    private http: HttpClient
  ) { }

  getAuth(): string {
    return this.auth;
  }

  login(userName: string, password: string): Observable<any> {
    this.auth = btoa(userName + ':' + password);
    return this.http.post<string>('api/login', {}).c
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.auth = '';

      console.error(error);
      return of(result as T);
    };
  }

  isLoggedIn() {
    return this.http.post<string>('api/login', {auth: this.auth}).subscribe(res => {
      this.auth = res;
    });
  }

}

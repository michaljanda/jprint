import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

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
    return this.http.post<string>('api/login', {});
  }

  isLoggedIn() {
    return this.http.post<string>('api/login', {auth: this.auth}).subscribe(res => {
      this.auth = res;
    });
  }

}

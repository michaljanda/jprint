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

  login(userName: string, password: string) {
    return this.http.post<string>('api/login', {auth: btoa(userName + ':' + password)}).subscribe(res => {
      this.auth = res;
    });
  }

  isLoggedIn() {
    return this.http.post<string>('api/login', {auth: this.auth}).subscribe(res => {
      this.auth = res;
    });
  }

}

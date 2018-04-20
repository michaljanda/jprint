import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class JiraService {

  constructor(
    private http: HttpClient
  ) { }

  searchIssues() {
    return this.http.get<any>('api/search');
  }

}

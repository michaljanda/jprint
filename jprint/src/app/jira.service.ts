import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class JiraService {

  constructor(
    private http: HttpClient
  ) { }

  searchIssues(query: string) {
    return this.http.get<any>('api/search/' + query);
  }

}

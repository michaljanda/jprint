import { Component, OnInit } from '@angular/core';
import {JiraService} from "../jira.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  constructor(
    private jiraService: JiraService
  ) {
    this.jiraService.searchIssues().subscribe((issues) => {
      console.log('issues',issues);
    })
  }

  ngOnInit() {
  }

}

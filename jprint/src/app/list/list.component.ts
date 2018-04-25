import {Component, OnInit} from '@angular/core';
import {JiraService} from "../jira.service";
import * as _ from 'lodash';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  public query: string;
  public loading: boolean = false;
  public errMsg = null;
  public tasks = [];
  public taskOpts = {description: true};

  public fields = [
    {name: 'C', review: true, show: true}, {name: 'UT', review: true, show: true}, {name: 'DOC', review: true, show: true},
    {name: 'T', review: true, show: true}, {name: 'RN', review: true, show: true}, {name: 'SD', show: true}, {name: 'A', show: true},
    {name: 'RG', show: false}, {name: 'SBL', show: false}
  ];

  constructor(private jiraService: JiraService) {

  }

  ngOnInit() {
  }

  clearInput() {
    this.query = '';
  }

  toggleFields() {
    let newState = !this.fields[0].show;
    _.forEach(this.fields, function (f) {
        f.show = newState;
    });
  }

  onLoad() {
    this.errMsg = null;
    this.loading = true;
    this.jiraService.searchIssues(this.query).subscribe((res) => {
      console.log('res',res);
      this.loading = false;
      this.tasks = res.issues;
    }, (rej) => {
      this.loading = false;
      this.errMsg = rej.error.errorMessages.join(' ');
    })
  }

}

import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.sass']
})
export class PaperComponent implements OnInit {

  @Input() task;
  @Input() fields;

  constructor() { }

  ngOnInit() {
  }

  getContent() {
    return (this.getAcceptanceCriteria() || this.task.fields.description).replace(/(?:\r\n|\r|\n)/g, '<br />');
  }

  getAcceptanceCriteria() {
    return this.task.fields.customfield_10101;
  }

  getFields() {
    return _.filter(this.fields, {show: true});
  }

}

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
  @Input() opts;

  constructor() { }

  ngOnInit() {
  }

  getContent() {
    let content = this.getAcceptanceCriteria();
    if (!content && this.opts.description) {
      content = this.task.fields.description;
    }
    return (content || '').replace(/(?:\r\n|\r|\n)/g, '<br />');
  }

  getAcceptanceCriteria() {
    return this.task.fields.customfield_10101;
  }

  getFields() {
    return _.filter(this.fields, {show: true});
  }

  getStoryPoints() {
    return this.task.fields.customfield_10002;
  }

}

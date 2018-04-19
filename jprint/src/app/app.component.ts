import { Component } from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {


  constructor(
    private userService: UserService
  ) {
    this.userService.login("jandam", "Drag1802");
  }

  title = 'app';
}

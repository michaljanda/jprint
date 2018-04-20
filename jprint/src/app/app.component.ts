import { Component } from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  loggedIn: boolean;

  constructor(
    private userService: UserService
  ) {
    console.log('test');
    this.userService.isLoggedIn();
  }
}

import { Component, OnInit } from '@angular/core';
import {Credentials} from "../classes/credentials";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  credentials: Credentials;

  constructor(private userService: UserService, private router: Router) {
    this.credentials = {username: '', password: ''};
  }

  ngOnInit() {
  }

  onLogin() {
    console.log('calling');
    this.userService.login(this.credentials.username, this.credentials.password).subscribe(() => {
        this.router.navigate(['/app']);
    });
  }

}

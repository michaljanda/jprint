import {Component, OnInit} from '@angular/core';
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
  failed: boolean = false;
  loggingIn: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.credentials = {username: '', password: ''};
  }

  ngOnInit() {
  }

  onLogin() {
    this.failed = false;
    this.loggingIn = true;
    console.log('logging');
    this.userService.login(this.credentials.username, this.credentials.password).subscribe(() => {
      this.router.navigate(['/app']);
    }, () => {
      this.failed = true;
      this.loggingIn = false;
    }, () => {
      this.loggingIn = false;
    });
  }

}

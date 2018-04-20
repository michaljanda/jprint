import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PaperComponent } from './paper/paper.component';
import {UserService} from "./user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    PaperComponent,
    LoginComponent,
    ListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Injectable} from "@angular/core";
import 'rxjs/add/operator/do';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {


  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // success
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }
}

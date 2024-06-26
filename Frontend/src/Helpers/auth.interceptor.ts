import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../Services/Common/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(catchError(err => {
            // if (err.status === 401 || err.status === 403) {
            //     // auto logout if 401 response returned from api
                
            //     console.log(this.authenticationService.currentUserValue)
            //     this.router.navigateByUrl(`/login`);
            // }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
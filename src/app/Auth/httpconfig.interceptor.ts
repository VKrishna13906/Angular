import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AuthHelpers implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        ////////
        request = request.clone({
            setHeaders: {
                Authorization: `Basic SUNzN0l5MnJOalZxZHZ1RFRwSFY5QT09Okx5Q29DTmpoR09oUnQyVnhuM2FXNkE9PTo`
            }
        });
        //console.log(request)
        return next.handle(request);
    }
}

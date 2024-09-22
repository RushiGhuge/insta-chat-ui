import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from local storage
    const authToken = localStorage.getItem('authToken');

    // Clone the request and set the new header
    if (authToken) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `${authToken}`
        }
      });

      // Pass the cloned request instead of the original request to the next handler
      return next.handle(clonedRequest);
    }

    // If there's no token, just pass the request along
    return next.handle(req);
  }
}

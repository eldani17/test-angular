import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
/* It implements the HttpInterceptor interface and overrides the intercept() method */
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  authorId: number = 17;
  /**
   * The intercept function takes a request, adds a header to it, and then passes it on to the next
   * handler
   * @param req - HttpRequest<any> - The request object
   * @param {HttpHandler} next - HttpHandler
   * @returns The next handler is being returned.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        authorId: `${this.authorId}`,
      },
    });

    return next.handle(request);
  }
}

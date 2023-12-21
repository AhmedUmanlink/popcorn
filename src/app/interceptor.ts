// auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENV } from './env';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}
env =ENV
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is to TMDb API
    if (request.url.includes('api.themoviedb.org')) {
      // Clone the request and add the TMDb API key
      const clonedRequest = request.clone({
        setParams: {
          api_key: this.env.api_key,
        },
      });

      // Pass the cloned request to the next handler
      return next.handle(clonedRequest);
    }

    // If it's not a TMDb API request, just pass it through
    return next.handle(request);
  }
}

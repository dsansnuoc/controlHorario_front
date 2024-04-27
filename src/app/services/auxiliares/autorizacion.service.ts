import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SesionStorageService } from './sesion-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionService implements HttpInterceptor {
  token: string | null;

  constructor(private localStorageService: SesionStorageService) {
    this.token = this.localStorageService.get('access_token');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = this.localStorageService.get('access_token');
    if (this.token) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });
    } else {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
      });
    }

    return next.handle(req);
  }
}

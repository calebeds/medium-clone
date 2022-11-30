import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersistenceService } from '../persistence/persistence.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.persistenceService.get('accessToken');
    req = req.clone({
      setHeaders: { Authorization: token ? `Token ${token}` : '' },
    });

    return next.handle(req);
  }
}

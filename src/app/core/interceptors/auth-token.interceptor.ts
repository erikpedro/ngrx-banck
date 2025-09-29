// src/app/core/interceptors/auth-token.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObpAuthService } from '../services/obp-auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  private readonly loginPath = '/my/logins/direct';
  private readonly baseUrl = environment.obp.baseUrl;

  constructor(private auth: ObpAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Se não é chamada para o OBP ou é o endpoint de login, segue sem token
    if (!req.url.startsWith(this.baseUrl) || req.url.includes(this.loginPath)) {
      return next.handle(req);
    }

    // Garante token e anexa header Authorization
    return this.auth.getToken$().pipe(
      switchMap(token => {
        const authReq = req.clone({
          setHeaders: { Authorization: `DirectLogin token="${token}"` }
        });
        return next.handle(authReq);
      })
    );
  }
}

// src/app/core/services/obp-auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface DirectLoginResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class ObpAuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  /** Obtém um token de DirectLogin (cache simples em memória). */
  getToken$(): Observable<string> {
    if (this.token) return of(this.token);

    const { baseUrl, username, password, consumerKey } = environment.obp;
    const url = `${baseUrl}/my/logins/direct`;

    const headers = new HttpHeaders({
      // Cabeçalho do DirectLogin (username/password/consumerKey)
      Authorization: `DirectLogin username="${username}", password="${password}", consumer_key="${consumerKey}"`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    // POST vazio com headers; resposta: { token: "..." }
    return this.http.post<DirectLoginResponse>(url, {}, { headers }).pipe(
      map(res => res.token),
      map(t => (this.token = t)), // guarda e devolve
      shareReplay(1)
    );
  }

  /** (Opcional) invalidar manualmente o token */
  clearToken(): void { this.token = null; }
}

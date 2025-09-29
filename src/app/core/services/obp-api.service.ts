// src/app/core/services/obp-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface ObpAmount { currency: string; amount: string; }
export interface ObpDetails {
  type: string;
  description: string;
  completed: string;
  value: ObpAmount;
}
export interface ObpTransaction {
  id: string;
  details: ObpDetails;
  // (há mais campos; para o estudo usamos só o essencial)
}
interface ObpTransactionsResponse {
  transactions: ObpTransaction[];
}

export interface TransacoesQuery {
  inicio: string;  // 'YYYY-MM-DD'
  fim: string;     // 'YYYY-MM-DD'
  origem?: string; // ignorado no servidor (filtramos client-side se quiser)
  tipos?: string[]; // idem
  page: number;
  pageSize: number;
  orderBy?: string;
}

@Injectable({ providedIn: 'root' })
export class ObpApiService {
  private readonly base = environment.obp.baseUrl;
  private readonly ver  = environment.obp.apiVersion;
  private readonly bank = environment.obp.bankId;
  private readonly acc  = environment.obp.accountId;
  private readonly view = environment.obp.viewId;

  constructor(private http: HttpClient) {}

  /** Busca transações via OBP; aplica paginação e data no servidor. */
  getTransactions$(q: TransacoesQuery): Observable<ObpTransaction[]> {
    const endpoint = `${this.base}/obp/${this.ver}/banks/${this.bank}/accounts/${this.acc}/${this.view}/transactions`;

    // OBP aceita from_date/to_date (ISO completo) + limit/offset + sort_direction
    const from = `${q.inicio}T00:00:00.000Z`;
    const to   = `${q.fim}T23:59:59.999Z`;
    const limit = q.pageSize;
    const offset = q.page * q.pageSize;

    let params = new HttpParams()
      .set('from_date', from)
      .set('to_date', to)
      .set('limit', String(limit))
      .set('offset', String(offset))
      .set('sort_direction', q.orderBy?.endsWith(':asc') ? 'asc' : 'desc');

    return this.http.get<ObpTransactionsResponse>(endpoint, { params }).pipe(
      map(res => res.transactions ?? [])
    );
  }
}

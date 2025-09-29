// src/app/state/transacoes/transacoes.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FiltrosActions } from 'src/app/state/filtros/filtros.actions';
import { selectQueryParams } from 'src/app/state/filtros/filtros.selectors';
import { TransacoesActions } from './transacoes.actions';
import { ObpApiService } from 'src/app/core/services/obp-api.service';
import { catchError, map, switchMap, withLatestFrom, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TransacoesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private api: ObpApiService,
  ) {}

  /** Quando o usuário clica "Aplicar", buscamos as transações com base nos filtros atuais. */
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FiltrosActions.apply),
      // evita flood se o usuário clicar repetidamente
      debounceTime(100),
      withLatestFrom(this.store.select(selectQueryParams)),
      // distinctUntilChanged em cima do objeto de query (stringify simples -> suficiente)
      distinctUntilChanged(([, a], [, b]) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap(([, query]) => {
        return this.api.getTransactions$(query).pipe(
          map(obpTxs => {
            // Mapeia OBP -> nosso modelo Transacao
            const items = obpTxs.map(tx => ({
              id: tx.id,
              type: tx.details?.type ?? '',
              description: tx.details?.description ?? '',
              completed: tx.details?.completed ?? '',
              amount: Number(tx.details?.value?.amount ?? 0),
              currency: tx.details?.value?.currency ?? 'XXX',
            }));
            return TransacoesActions.loadSuccess({ items, total: items.length });
          }),
          catchError((err) => of(TransacoesActions.loadFailure({
            error: (err?.error?.message ?? err?.message ?? 'Erro ao carregar transações')
          }))),
          // dispara "loading" antes
          // Dica: você também pode disparar TransacoesActions.load() antes do switchMap
        );
      })
    )
  );

  /** Opcional: quando Apply é disparado, ligamos o "loading" imediatamente. */
  setLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FiltrosActions.apply),
      map(() => TransacoesActions.load())
    )
  );
}

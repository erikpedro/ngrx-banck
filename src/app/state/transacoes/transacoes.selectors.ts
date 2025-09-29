// src/app/state/transacoes/transacoes.selectors.ts
import { createSelector } from '@ngrx/store';
import { transacoesFeature } from './transacoes.reducer';
import { transacoesAdapter } from './transacoes.models';

const entitySelectors = transacoesAdapter.getSelectors();

export const selectTransacoesState = transacoesFeature.selectTransacoesState;
export const selectLoading  = transacoesFeature.selectLoading;
export const selectError    = transacoesFeature.selectError;
export const selectTotal    = transacoesFeature.selectTotal;

export const selectAllTransacoes = createSelector(
  selectTransacoesState,
  entitySelectors.selectAll
);

// src/app/state/transacoes/transacoes.reducer.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import { transacoesAdapter, TransacoesState } from './transacoes.models';
import { TransacoesActions } from './transacoes.actions';

const initialState: TransacoesState = transacoesAdapter.getInitialState({
  loading: false,
  error: null,
  total: 0,
});

export const transacoesFeature = createFeature({
  name: 'transacoes',
  reducer: createReducer(
    initialState,
    on(TransacoesActions.reset, () => initialState),

    on(TransacoesActions.load, (state) => ({
      ...state, loading: true, error: null
    })),

    on(TransacoesActions.loadSuccess, (state, { items, total }) =>
      transacoesAdapter.setAll(items, { ...state, loading: false, total })
    ),

    on(TransacoesActions.loadFailure, (state, { error }) => ({
      ...state, loading: false, error
    })),
  ),
});

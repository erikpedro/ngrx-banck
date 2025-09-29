// src/app/state/filtros/filtros.reducer.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import { FiltrosActions } from 'src/app/state/filtros/filtros.actions';
import { FiltrosState } from 'src/app/state/filtros/filtros.models';

// Utilitário: Date -> 'YYYY-MM-DD' (UTC, apenas a data)
const toISO = (d: Date) =>
  new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    .toISOString()
    .slice(0, 10);

// Estado inicial: últimos 7 dias, sem filtros específicos
const today = new Date();
const start = new Date(today);
start.setDate(today.getDate() - 7);

const initialState: FiltrosState = {
  periodo: { inicio: toISO(start), fim: toISO(today) },
  origem: 'TODOS',
  tipos: [],
  page: 0,
  pageSize: 25,
  orderBy: 'data:desc',
};

// Nome da feature no Store (aparece no DevTools)
export const filtrosFeatureKey = 'filtros';

// Reducer puro com on(...) para cada ação relevante.
// Sempre retorna NOVOS objetos (imutabilidade).
export const filtrosReducer = createReducer(
  initialState,

  on(FiltrosActions.setPeriodo, (state, { periodo }) => ({
    ...state,
    periodo,
    page: 0, // ao mudar datas, voltamos para a 1ª página
  })),

  on(FiltrosActions.setOrigem, (state, { origem }) => ({
    ...state,
    origem,
    page: 0,
  })),

  on(FiltrosActions.setTipos, (state, { tipos }) => ({
    ...state,
    tipos: [...tipos], // copia defensiva
    page: 0,
  })),

  on(FiltrosActions.setPaginacao, (state, { page, pageSize }) => ({
    ...state,
    page,
    pageSize,
  })),

  on(FiltrosActions.setOrdenacao, (state, { orderBy }) => ({
    ...state,
    orderBy,
    page: 0,
  })),

  on(FiltrosActions.reset, () => initialState)
);

// createFeature gera selectors base (selectFiltrosState, selectPeriodo, etc.)
// e ajuda a registrar o reducer com forFeature sem boilerplate.
export const filtrosFeature = createFeature({
  name: filtrosFeatureKey,
  reducer: filtrosReducer,
});

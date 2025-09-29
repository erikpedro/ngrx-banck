// src/app/state/filtros/filtros.selectors.ts
import { createSelector } from '@ngrx/store';
import { filtrosFeature } from 'src/app/state/filtros/filtros.reducer';

// Selectors gerados pelo createFeature:
export const selectFiltrosState = filtrosFeature.selectFiltrosState;
export const selectPeriodo     = filtrosFeature.selectPeriodo;
export const selectOrigem      = filtrosFeature.selectOrigem;
export const selectTipos       = filtrosFeature.selectTipos;
export const selectPage        = filtrosFeature.selectPage;
export const selectPageSize    = filtrosFeature.selectPageSize;
export const selectOrderBy     = filtrosFeature.selectOrderBy;

// Validação simples de período
export const selectIsPeriodoValido = createSelector(
  selectPeriodo,
  (p) => p.inicio <= p.fim
);

// Selector composto: objeto pronto para query de API
export const selectQueryParams = createSelector(
  selectPeriodo,
  selectOrigem,
  selectTipos,
  selectPage,
  selectPageSize,
  selectOrderBy,
  (periodo, origem, tipos, page, pageSize, orderBy) => ({
    inicio: periodo.inicio,
    fim: periodo.fim,
    origem: origem === 'TODOS' ? undefined : origem,
    tipos: tipos.length ? tipos : undefined,
    page,
    pageSize,
    orderBy: orderBy ?? undefined,
  })
);

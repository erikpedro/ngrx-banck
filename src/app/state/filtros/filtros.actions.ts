// src/app/state/filtros/filtros.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Periodo, OrigemTransacao, TipoTransacao } from 'src/app/state/filtros/filtros.models';

// Usamos createActionGroup para agrupar as ações com um “source” comum.
// Fica organizado no DevTools e com melhor DX.
export const FiltrosActions = createActionGroup({
  source: 'Filtros',
  events: {
    // Atualiza o período completo (inicio/fim)
    'Set Periodo': props<{ periodo: Periodo }>(),

    // Atualiza a origem (ATM/CAIXA/TODOS)
    'Set Origem': props<{ origem: OrigemTransacao }>(),

    // Atualiza o conjunto de tipos selecionados
    'Set Tipos': props<{ tipos: TipoTransacao[] }>(),

    // Paginação (page atual e pageSize)
    'Set Paginacao': props<{ page: number; pageSize: number }>(),

    // Ordenação, por exemplo 'data:desc'
    'Set Ordenacao': props<{ orderBy: string | null }>(),

    // Reseta o slice para o estado inicial
    'Reset': emptyProps(),

    // “Sinal” para Effects: aplicar (disparar busca com os filtros atuais)
    'Apply': emptyProps(),
  },
});

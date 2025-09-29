// src/app/state/transacoes/transacoes.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transacao } from './transacoes.models';

export const TransacoesActions = createActionGroup({
  source: 'Transacoes',
  events: {
    'Load': emptyProps(), // iniciar carregamento
    'Load Success': props<{ items: Transacao[]; total: number }>(),
    'Load Failure': props<{ error: string }>(),
    'Reset': emptyProps(),
  },
});

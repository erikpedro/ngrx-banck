// src/app/state/transacoes/transacoes.models.ts
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface Transacao {
  id: string;
  type: string;
  description: string;
  completed: string; // ISO
  amount: number;
  currency: string;
}

export const transacoesAdapter = createEntityAdapter<Transacao>({
  selectId: t => t.id,
  sortComparer: (a, b) => b.completed.localeCompare(a.completed), // mais recente primeiro
});

export interface TransacoesState extends EntityState<Transacao> {
  loading: boolean;
  error: string | null;
  total: number;
}

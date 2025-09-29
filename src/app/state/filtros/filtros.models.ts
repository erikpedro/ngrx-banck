// src/app/state/filtros/filtros.models.ts

// Tipos “controlados” para origem e tipo de transação.
// Vantagem: o TypeScript te protege contra valores inválidos.
export type OrigemTransacao = 'ATM' | 'CAIXA' | 'TODOS';

export type TipoTransacao =
  | 'DEPOSITO'
  | 'SAQUE'
  | 'TRANSFERENCIA'
  | 'PAGAMENTO'
  | 'TED'
  | 'PIX'
  | 'OUTRO';

// Mantemos datas em formato ISO curto (YYYY-MM-DD) no estado
// porque é serializável/imutável e amigável para a API.
export interface Periodo {
  inicio: string;
  fim: string;
}

// Shape do slice “filtros” no Store.
// Tudo aqui deve ser serializável e imutável.
export interface FiltrosState {
  periodo: Periodo;
  origem: OrigemTransacao;
  tipos: TipoTransacao[]; // vazio => todos
  page: number;           // 0-based
  pageSize: number;       // itens por página
  orderBy: string | null;// ex.: 'data:desc'
}

// src/app/features/transacoes/components/filtros/filtros.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { FiltrosActions } from 'src/app/state/filtros/filtros.actions';
import { selectFiltrosState } from 'src/app/state/filtros/filtros.selectors';
import { OrigemTransacao, TipoTransacao, FiltrosState } from 'src/app/state/filtros/filtros.models';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit, OnDestroy {

  // Formulário reativo que espelha o slice "filtros" da store.
  form: FormGroup = this.fb.group({
    // datas como Date no formulário (serializaremos para ISO antes de mandar à store)
    inicio: [new Date()],
    fim:    [new Date()],

    // origem e tipos
    origem: ['TODOS' as OrigemTransacao],
    tipos:  [[] as TipoTransacao[]],
  });

  // Opções de UI – mantemos aqui para simplificar
  origemOptions: OrigemTransacao[] = ['TODOS', 'ATM', 'CAIXA'];
  tipoOptions: TipoTransacao[] = ['DEPOSITO', 'SAQUE', 'TRANSFERENCIA', 'PAGAMENTO', 'TED', 'PIX', 'OUTRO'];

  // Usado para encerrar inscrições (evitar memory leak)
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    // 1) Sincroniza o FORM com o estado atual da store (inicial e futuras mudanças externas)
    this.store.select(selectFiltrosState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: FiltrosState) => {
        // Converte ISO (YYYY-MM-DD) -> Date para o formulário
        const inicioDate = state.periodo.inicio ? this.isoToDate(state.periodo.inicio) : new Date();
        const fimDate    = state.periodo.fim ? this.isoToDate(state.periodo.fim) : new Date();

        // patchValue sem emitir eventos para não disparar actions em loop
        this.form.patchValue({
          inicio: inicioDate,
          fim:    fimDate,
          origem: state.origem,
          tipos:  state.tipos,
        }, { emitEvent: false });
      });

    // 2) Escuta mudanças de cada controle e despacha a action correspondente
    //    Usamos debounce e distinctUntilChanged para evitar ruído/duplicidade.

    // a) Período - início
    this.form.get('inicio')!.valueChanges.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      map((d: Date | null) => this.dateToIso(d)),
      takeUntil(this.destroy$)
    ).subscribe((inicioISO) => {
      const fimISO = this.dateToIso(this.form.get('fim')!.value);
      this.store.dispatch(FiltrosActions.setPeriodo({ periodo: { inicio: inicioISO, fim: fimISO } }));
    });

    // b) Período - fim
    this.form.get('fim')!.valueChanges.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      map((d: Date | null) => this.dateToIso(d)),
      takeUntil(this.destroy$)
    ).subscribe((fimISO) => {
      const inicioISO = this.dateToIso(this.form.get('inicio')!.value);
      this.store.dispatch(FiltrosActions.setPeriodo({ periodo: { inicio: inicioISO, fim: fimISO } }));
    });

    // c) Origem (TODOS | ATM | CAIXA)
    this.form.get('origem')!.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((origem: OrigemTransacao) => {
      this.store.dispatch(FiltrosActions.setOrigem({ origem }));
    });

    // d) Tipos (multi-select)
    this.form.get('tipos')!.valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      takeUntil(this.destroy$)
    ).subscribe((tipos: TipoTransacao[]) => {
      this.store.dispatch(FiltrosActions.setTipos({ tipos }));
    });
  }

  // Botão "Aplicar" – sinaliza para Effects que é hora de buscar dados
  onApply(): void {
    this.store.dispatch(FiltrosActions.apply());
  }

  // Conversão segura Date -> 'YYYY-MM-DD' (ISO curta, serializável)
  private dateToIso(d: Date | null | undefined): string {
    const dd = d instanceof Date ? d : new Date();
    // zera hora para evitar timezone “puxar” um dia anterior
    const y = dd.getFullYear();
    const m = `${dd.getMonth() + 1}`.padStart(2, '0');
    const day = `${dd.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // Converte 'YYYY-MM-DD' em Date local (para o controle de data)
  private isoToDate(iso: string): Date {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, (m - 1), d);
  }

  ngOnDestroy(): void {
    // encerra todas as inscrições
    this.destroy$.next();
    this.destroy$.complete();
  }
}

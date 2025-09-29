// src/app/state/transacoes/transacoes-store.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { transacoesFeature } from './transacoes.reducer';
import { TransacoesEffects } from './transacoes.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(transacoesFeature),
    EffectsModule.forFeature([TransacoesEffects]),
  ],
})
export class TransacoesStoreModule {}

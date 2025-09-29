// src/app/state/filtros/filtros-store.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Importa a feature “pronta” (reducers + selectors base)
import { filtrosFeature } from 'src/app/state/filtros/filtros.reducer';

@NgModule({
  imports: [
    // Registra o reducer “filtros” como feature no Store
    StoreModule.forFeature(filtrosFeature),

    // Por enquanto, nenhum Effect específico de filtros
    EffectsModule.forFeature([]),
  ],
})
export class FiltrosStoreModule {}

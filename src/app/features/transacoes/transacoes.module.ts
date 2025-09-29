// src/app/features/transacoes/transacoes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material usados no formulário de filtros
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule }    from '@angular/material/select';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { TransacoesRoutingModule } from './transacoes-routing.module';
import { TransacoesHomeComponent } from './pages/transacoes-home/transacoes-home.component';
import { FiltrosComponent } from './components/filtros/filtros.component';

@NgModule({
  declarations: [
    TransacoesHomeComponent,
    FiltrosComponent, // declara o componente de filtros
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Material para inputs/seletores
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,

    TransacoesRoutingModule,
  ],
})
export class TransacoesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransacoesRoutingModule } from './transacoes-routing.module';
import { TransacoesHomeComponent } from './pages/transacoes-home/transacoes-home.component';


@NgModule({
  declarations: [
    TransacoesHomeComponent
  ],
  imports: [
    CommonModule,
    TransacoesRoutingModule
  ]
})
export class TransacoesModule { }

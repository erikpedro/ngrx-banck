import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosHomeComponent } from './pages/relatorios-home/relatorios-home.component';


@NgModule({
  declarations: [
    RelatoriosHomeComponent
  ],
  imports: [
    CommonModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }

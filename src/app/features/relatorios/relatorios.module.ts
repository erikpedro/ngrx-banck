import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoriosHomeComponent } from './pages/relatorios-home/relatorios-home.component';
import { RelatoriosRoutingModule } from './relatorios-routing.module';

@NgModule({
  declarations: [RelatoriosHomeComponent],
  imports: [CommonModule, RelatoriosRoutingModule],
})
export class RelatoriosModule {}

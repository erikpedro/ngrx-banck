import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosHomeComponent } from './pages/relatorios-home/relatorios-home.component';

const routes: Routes = [
  {
    path: '',
    component: RelatoriosHomeComponent,
    data: { title: 'Relatórios', breadcrumb: 'Relatórios' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatoriosRoutingModule {}

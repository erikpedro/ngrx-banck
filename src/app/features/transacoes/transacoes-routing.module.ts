import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransacoesHomeComponent } from './pages/transacoes-home/transacoes-home.component';

const routes: Routes = [
  {
    path: '',
    component: TransacoesHomeComponent,
    data: { title: 'Transações', breadcrumb: 'Transações' },
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransacoesRoutingModule {}

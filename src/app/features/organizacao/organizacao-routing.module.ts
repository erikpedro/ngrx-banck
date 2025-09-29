import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizacaoHomeComponent } from './pages/organizacao-home/organizacao-home.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizacaoHomeComponent,
    data: { title: 'Organização', breadcrumb: 'Organização' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizacaoRoutingModule {}


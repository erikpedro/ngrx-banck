import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizacaoRoutingModule } from './organizacao-routing.module';
import { OrganizacaoHomeComponent } from './pages/organizacao-home/organizacao-home.component';


@NgModule({
  declarations: [
    OrganizacaoHomeComponent
  ],
  imports: [
    CommonModule,
    OrganizacaoRoutingModule
  ]
})
export class OrganizacaoModule { }

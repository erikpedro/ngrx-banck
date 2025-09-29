import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizacaoHomeComponent } from './pages/organizacao-home/organizacao-home.component';
import { OrganizacaoRoutingModule } from './organizacao-routing.module';

@NgModule({
  declarations: [OrganizacaoHomeComponent],
  imports: [CommonModule, OrganizacaoRoutingModule],
})
export class OrganizacaoModule {}

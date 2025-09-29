import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ShellComponent } from './layout/shell/shell.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
// Sidebar não é mais usado; pode deixar o arquivo ou remover depois.

@NgModule({
  declarations: [ShellComponent, TopbarComponent, BreadcrumbsComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [ShellComponent],
})
export class CoreModule {}

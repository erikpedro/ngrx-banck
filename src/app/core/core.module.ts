import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './layout/shell/shell.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';



@NgModule({
  declarations: [
    ShellComponent,
    TopbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }

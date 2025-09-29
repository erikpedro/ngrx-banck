import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'organizacao', pathMatch: 'full' },

      {
        path: 'organizacao',
        loadChildren: () =>
          import('./features/organizacao/organizacao.module')
            .then(m => m.OrganizacaoModule),
      },
      {
        path: 'transacoes',
        loadChildren: () =>
          import('./features/transacoes/transacoes.module')
            .then(m => m.TransacoesModule),
      },
      {
        path: 'relatorios',
        loadChildren: () =>
          import('./features/relatorios/relatorios.module')
            .then(m => m.RelatoriosModule),
      },
    ],
  },

  // fallback
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

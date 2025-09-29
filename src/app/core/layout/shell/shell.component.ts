import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, filter, startWith, distinctUntilChanged } from 'rxjs/operators';

type NavLink = { path: string; label: string; icon: string };

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  isHandset$: Observable<boolean> = this.bp.observe(Breakpoints.Handset).pipe(
    map(r => r.matches),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  pageTitle$: Observable<string> = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    startWith(null),
    map(() => this.deepestTitle(this.route)),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  navLinks: NavLink[] = [
    { path: '/organizacao', label: 'Organização', icon: 'account_tree' },
    { path: '/transacoes',  label: 'Transações',  icon: 'sync_alt'      },
    { path: '/relatorios',  label: 'Relatórios',  icon: 'analytics'     },
  ];

  constructor(
    private bp: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private deepestTitle(ar: ActivatedRoute): string {
    let child: ActivatedRoute | null = ar;
    let title = '';
    while (child?.firstChild) {
      child = child.firstChild;
      const t = child.snapshot.data?.['title'];
      if (t) title = String(t);
    }
    return title;
  }
}

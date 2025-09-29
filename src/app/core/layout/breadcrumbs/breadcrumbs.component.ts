import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

type Crumb = { label: string; url: string; last: boolean };

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  crumbs$: Observable<Crumb[]> = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    startWith(null),
    map(() => this.buildCrumbs()),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private router: Router, private route: ActivatedRoute) {}

  private buildCrumbs(): Crumb[] {
    const crumbs: Crumb[] = [];
    let current = this.route.root;
    let url = '';

    while (current.firstChild) {
      current = current.firstChild;
      const routeSnapshot = current.snapshot;
      const data = routeSnapshot.data || {};
      const segs = routeSnapshot.url?.map(s => s.path).filter(Boolean) ?? [];

      if (segs.length) {
        url += '/' + segs.join('/');
      }

      if (data['breadcrumb']) {
        crumbs.push({
          label: String(data['breadcrumb']),
          url,
          last: false,
        });
      }
    }

    if (crumbs.length) {
      crumbs[crumbs.length - 1].last = true;
    }
    return crumbs;
  }
}

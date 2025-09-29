import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly appName = 'Ngrx Banck';

  constructor(private readonly title: Title) { super(); }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.title.setTitle(`${title} • ${this.appName}`);
    } else {
      this.title.setTitle(this.appName);
    }
  }

  override buildTitle(snapshot: RouterStateSnapshot): string | undefined {
    // Usa o data.title da rota mais profunda
    return super.buildTitle(snapshot);
  }
}

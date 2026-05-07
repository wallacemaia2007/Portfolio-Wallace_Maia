import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './modules/shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { SeoService } from './modules/shared/services/seo/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule],
  template: `<app-loading></app-loading>
    <router-outlet />`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    // Inicia o listener de rotas para atualizar metadados em cada navegação
    this.seoService.init();
  }
}

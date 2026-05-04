import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/portfolio/portfolio.routes').then(
        (m) => m.PORTFOLIO_ROUTES,
      ),
  },
  {
    path: 'dev',
    loadComponent: () =>
      import('./modules/dev-landing/dev-landing.component').then(
        (m) => m.DevLandingComponent,
      ),
  },
];

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  template: `<app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer> `,
  styles: `
    .scrollbar-thin {
      scrollbar-width: thin;
      scrollbar-color: var(--color-scrollbar) transparent;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--color-scrollbar);
        border-radius: 4px;

        &:hover {
          background: var(--color-primary-dark);
        }
      }
    }
  `,
})
export class PortfolioComponent {}

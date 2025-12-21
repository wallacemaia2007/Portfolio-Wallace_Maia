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
})
export class PortfolioComponent {}

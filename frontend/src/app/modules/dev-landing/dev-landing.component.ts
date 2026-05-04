import { Component } from '@angular/core';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { StackComponent } from './pages/stack/stack.component';
import { HeroComponent } from './pages/hero/hero.component';
import { CtaComponent } from './pages/cta/cta.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';

export const RouterLinks = {
  hero: true,
  stack: true,
  cta: true,
  projects: true,
  contact: true,
};

@Component({
  selector: 'app-dev-landing',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    StackComponent,
    ProjectsComponent,
    HeroComponent,
    ContactComponent,
    CtaComponent,
  ],
  templateUrl: './dev-landing.component.html',
})
export class DevLandingComponent {
  readonly whatsappFloatingLink: string;
  routerLinks = RouterLinks;

  constructor() {
    this.whatsappFloatingLink =
      'https://wa.me/5535910036806?text=Olá%20Wallace%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20projetos!';
  }
}

import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { StackComponent } from './pages/stack/stack.component';
import { HeroComponent } from './pages/hero/hero.component';
import { CtaComponent } from './pages/cta/cta.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WorksComponent } from './pages/works/works.component';

export const RouterLinks = {
  hero: true,
  works: true,
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
    WorksComponent,
    ContactComponent,
    CtaComponent,
  ],
  templateUrl: './dev-landing.component.html',
  styleUrls: ['./dev-landing.component.scss'],
})
export class DevLandingComponent implements OnInit, OnDestroy {
  private renderer = inject(Renderer2);
  readonly whatsappFloatingLink: string;
  routerLinks = RouterLinks;

  constructor() {
    this.whatsappFloatingLink =
      'https://wa.me/5535910036806?text=Olá%20Wallace%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20projetos!';
  }

  ngOnInit(): void {
    // Landing page uses Tailwind dark mode via .dark class
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }
}

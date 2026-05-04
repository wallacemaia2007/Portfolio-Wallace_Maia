import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SocialLinksComponent } from '../../../shared/components/social-links/social-links.component';

export interface FooterTemplate {
  fullName: string;
  bio: string;
  quickLinks: { label: string; href: string }[];
  email: string;
  phone: string;
  location: string;
  currentYear: number;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ScrollRevealDirective,
    MatTooltip,
    SocialLinksComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  // TODO: Replace placeholder data with your real info.
  footerData: FooterTemplate = {
    fullName: 'Wallace Maia',
    bio: 'Desenvolvedor full stack focado em experiencias digitais, produtos claros e codigo limpo.',
    quickLinks: [
      { label: 'Inicio', href: '#hero' },
      { label: 'Projetos', href: '#projects' },
      { label: 'Stack', href: '#stack' },
      { label: 'Contato', href: '#contact' },
      { label: 'CTA', href: '#cta' },
    ],
    email: 'contato@maiawall.com',
    phone: '+55 00 00000-0000',
    location: 'Minas Gerais, Brasil',
    currentYear: new Date().getFullYear(),
  };

  scrollTo(event: Event, href: string): void {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

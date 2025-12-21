import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SocialLinksComponent } from '../social-links/social-links.component';

export interface footerTemplate {
  acronym: string;
  fullName: string;
  description: string;
  quickLinks: { label: string; route: string }[];
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
    RouterLink,
    MatIconModule,
    MatButtonModule,
    SocialLinksComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footerData: footerTemplate = {
    acronym: '',
    fullName: '',
    description: '',
    quickLinks: [
      { label: 'Início', route: '/home' },
      { label: 'Sobre', route: '/about' },
      { label: 'Projetos', route: '/projects' },
      { label: 'Skills', route: '/skills' },
      { label: 'Experiência', route: '/experience' },
      { label: 'Contato', route: '/contact' },
    ],
    email: '',
    phone: '',
    location: '',
    currentYear: new Date().getFullYear(),
  };

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { PortfolioService } from '../../../portfolio/services/portfolio.service';

export interface footerTemplate {
  acronym: string;
  fullName: string;
  bio: string;
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
export class FooterComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  footerData: footerTemplate = {
    acronym: '',
    fullName: '',
    bio: '',
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

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe((data) => {
      this.footerData.acronym = data.acronym;
      this.footerData.fullName = data.fullName;
      this.footerData.bio = data.bio;
      this.footerData.email = data.email;
      this.footerData.phone = data.phone;
      this.footerData.location = data.location;
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

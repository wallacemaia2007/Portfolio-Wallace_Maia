import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { PortfolioService } from '../../../portfolio/services/portfolio.service';
import { MatTooltip } from '@angular/material/tooltip';
import { ScrollRevealDirective } from "../../directives/scroll-reveal.directive";
import { TranslateService } from '../../../../core/services/translate.service';
import { LangTextPipe } from '../../pipes/lang-text.pipe';
import {
  PortfolioActionLink,
  portfolioPrimaryAction,
} from '../../../portfolio/config/navigation.config';

export interface footerTemplate {
  acronym: string;
  fullName: string;
  bio: string;
  bioEn?: string;
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
    MatTooltip,
    ScrollRevealDirective,
    LangTextPipe,
],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  translate = inject(TranslateService);
  readonly servicesAction: PortfolioActionLink = portfolioPrimaryAction;

  footerData: footerTemplate = {
    acronym: '',
    fullName: '',
    bio: '',
    quickLinks: [
      { label: 'navbar.home', route: '/home' },
      { label: 'navbar.about', route: '/about' },
      { label: 'navbar.projects', route: '/projects' },
      { label: 'navbar.skills', route: '/skills' },
      { label: 'navbar.experience', route: '/experience' },
      { label: 'navbar.contact', route: '/contact' },
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
      this.footerData.bioEn = data.bioEn;
      this.footerData.email = data.email;
      this.footerData.phone = data.phone;
      this.footerData.location = data.location;
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

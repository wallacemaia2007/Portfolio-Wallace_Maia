import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../../portfolio/services/theme.service';
import { PortfolioService } from '../../../portfolio/services/portfolio.service';
import { MatTooltip } from '@angular/material/tooltip';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

export interface NavbarTemplate {
  acronym: string;
  fullName: string;
  navItems: { label: string; route: string; icon: string }[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltip,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private themeService = inject(ThemeService);
  private portfolioService = inject(PortfolioService);

  navbarData: NavbarTemplate = {
    acronym: '',
    fullName: '',
    navItems: [
      { label: 'Início', route: '/home', icon: 'home' },
      { label: 'Sobre', route: '/about', icon: 'person' },
      { label: 'Projetos', route: '/projects', icon: 'work' },
      { label: 'Skills', route: '/skills', icon: 'code' },
      { label: 'Experiência', route: '/experience', icon: 'business_center' },
      { label: 'Contato', route: '/contact', icon: 'email' },
    ],
  };

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe((data) => {
      this.navbarData.acronym = data.acronym;
      this.navbarData.fullName = data.fullName;
    });
  }

  public menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}

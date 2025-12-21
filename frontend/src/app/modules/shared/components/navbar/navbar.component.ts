import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../../portfolio/services/theme.service';

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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private themeService = inject(ThemeService);

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

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
import { ScrollHideDirective } from '../../directives/scroll-hide.directive';
import { ButtonComponent } from "../button/button.component";
import { TranslateService, SupportedLang } from '../../../../core/services/translate.service';

export interface NavbarTemplate {
  acronym: string;
  fullName: string;
  navItems: { label: string; route: string; icon: string; translateKey: string }[];
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
    ScrollHideDirective,
    ButtonComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private themeService = inject(ThemeService);
  private portfolioService = inject(PortfolioService);
  protected translate = inject(TranslateService);

  navbarData: NavbarTemplate = {
    acronym: '',
    fullName: '',
    navItems: [
      { label: 'Início', route: '/home', icon: 'home', translateKey: 'home' },
      { label: 'Sobre', route: '/about', icon: 'person', translateKey: 'about' },
      { label: 'Projetos', route: '/projects', icon: 'work', translateKey: 'projects' },
      { label: 'Skills', route: '/skills', icon: 'code', translateKey: 'skills' },
      { label: 'Experiência', route: '/experience', icon: 'business_center', translateKey: 'experience' },
      { label: 'Contato', route: '/contact', icon: 'email', translateKey: 'contact' },
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

  toggleLang(): void {
    this.translate.toggleLang();
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  get currentLang(): SupportedLang {
    return this.translate.currentLang();
  }
}

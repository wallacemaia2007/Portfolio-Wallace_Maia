import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../../portfolio/services/theme.service';
import { PortfolioService } from '../../../portfolio/services/portfolio.service';
import { MatTooltip } from '@angular/material/tooltip';
import { ScrollHideDirective } from '../../directives/scroll-hide.directive';
import {
  TranslateService,
  SupportedLang,
} from '../../../../core/services/translate.service';
import {
  PortfolioActionLink,
  PortfolioNavItem,
  portfolioNavItems,
  portfolioPrimaryAction,
  portfolioSecondaryAction,
} from '../../../portfolio/config/navigation.config';

export interface NavbarTemplate {
  acronym: string;
  fullName: string;
  navItems: PortfolioNavItem[];
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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('mobilePanel') private mobilePanel?: ElementRef<HTMLElement>;

  private themeService = inject(ThemeService);
  private portfolioService = inject(PortfolioService);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  protected translate = inject(TranslateService);

  readonly primaryAction: PortfolioActionLink = portfolioPrimaryAction;
  readonly secondaryAction: PortfolioActionLink = portfolioSecondaryAction;

  navbarData: NavbarTemplate = {
    acronym: '',
    fullName: '',
    navItems: portfolioNavItems,
  };

  public menuOpen = false;
  private previousBodyOverflow = '';
  private readonly focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    "[tabindex]:not([tabindex='-1'])",
  ].join(',');

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe((data) => {
      this.navbarData.acronym = data.acronym;
      this.navbarData.fullName = data.fullName;
    });
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  toggleMenu(): void {
    this.menuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    if (this.menuOpen) return;

    this.menuOpen = true;
    this.lockBodyScroll();
    this.focusFirstMenuElement();
  }

  closeMenu(): void {
    if (!this.menuOpen) return;

    this.menuOpen = false;
    this.unlockBodyScroll();
    this.menuButton?.nativeElement.focus();
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

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.menuOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId) && window.innerWidth >= 1024) {
      this.closeMenu();
    }
  }

  private lockBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.previousBodyOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.document.body.style.overflow = this.previousBodyOverflow;
  }

  private focusFirstMenuElement(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    requestAnimationFrame(() => {
      const firstFocusable = this.getFocusableElements()[0];
      firstFocusable?.focus();
    });
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusable = this.getFocusableElements();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    return Array.from(
      this.mobilePanel?.nativeElement.querySelectorAll<HTMLElement>(
        this.focusableSelector,
      ) ?? [],
    ).filter((element) => element.offsetParent !== null);
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  OnInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavLink {
  label: string;
  href: string;
  section: string;
  feature?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  // TODO: Replace placeholder URLs with your real links.
  readonly navLinks: NavLink[] = [
    { label: 'Inicio', href: '#hero', section: 'hero' },
    { label: 'Projetos', href: '#projects', section: 'projects' },
    { label: 'Stack', href: '#stack', section: 'stack' },
    { label: 'Contato', href: '#contact', section: 'contact' },
    { label: 'CTA', href: '#cta', section: 'cta' },
  ];
  readonly ctaLinks = {
    contact: '#contact',
    cv: '/assets/cv.pdf',
    whatsapp:
      'https://wa.me/5500000000000?text=Ola%20Wallace%2C%20vamos%20conversar!',
    github: 'https://github.com/SEU_USUARIO',
    linkedin: 'https://www.linkedin.com/in/SEU_USUARIO/',
    instagram: 'https://www.instagram.com/SEU_USUARIO/',
  };
  isMenuOpen = false;
  isAuthenticated = !!localStorage.getItem('token');

  // ── Swipe state ─────────────────────────────────────────────
  private touchStartX = 0;
  private touchStartY = 0;
  private readonly SWIPE_THRESHOLD = 55;
  private readonly EDGE_ZONE = 40;
  private readonly VERTICAL_LIMIT = 80;

  private boundTouchStart!: (e: TouchEvent) => void;
  private boundTouchMove!: (e: TouchEvent) => void;
  private boundTouchEnd!: (e: TouchEvent) => void;

  constructor(
    private readonly ngZone: NgZone,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.boundTouchStart = this.handleTouchStart.bind(this);
      this.boundTouchMove = this.handleTouchMove.bind(this);
      this.boundTouchEnd = this.handleTouchEnd.bind(this);

      document.addEventListener('touchstart', this.boundTouchStart, {
        passive: true,
      });
      document.addEventListener('touchmove', this.boundTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', this.boundTouchEnd, {
        passive: true,
      });
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('touchstart', this.boundTouchStart);
    document.removeEventListener('touchmove', this.boundTouchMove);
    document.removeEventListener('touchend', this.boundTouchEnd);
  }

  private handleTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  }

  private handleTouchMove(e: TouchEvent): void {
    const deltaX = e.touches[0].clientX - this.touchStartX;
    const deltaY = Math.abs(e.touches[0].clientY - this.touchStartY);

    // Prevent scroll when swiping left to close open menu
    if (this.isMenuOpen && deltaX < -10 && deltaY < this.VERTICAL_LIMIT) {
      e.preventDefault();
    }
  }

  private handleTouchEnd(e: TouchEvent): void {
    const deltaX = e.changedTouches[0].clientX - this.touchStartX;
    const deltaY = Math.abs(e.changedTouches[0].clientY - this.touchStartY);

    if (deltaY > this.VERTICAL_LIMIT) return;

    // Swipe RIGHT from left edge → open
    if (
      deltaX > this.SWIPE_THRESHOLD &&
      this.touchStartX < this.EDGE_ZONE &&
      !this.isMenuOpen
    ) {
      this.ngZone.run(() => {
        this.openMenu();
        this.cdr.markForCheck();
      });
      return;
    }

    // Swipe LEFT → close
    if (deltaX < -this.SWIPE_THRESHOLD && this.isMenuOpen) {
      this.ngZone.run(() => {
        this.closeMenu();
        this.cdr.markForCheck();
      });
    }
  }

  scrollTo(event: Event, href: string): void {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (this.isMenuOpen) this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    this.isMenuOpen = true;
    document.body.style.overflow = 'hidden';
    this.cdr.markForCheck();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
    this.cdr.markForCheck();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isMenuOpen) this.closeMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 900 && this.isMenuOpen) this.closeMenu();
  }
}

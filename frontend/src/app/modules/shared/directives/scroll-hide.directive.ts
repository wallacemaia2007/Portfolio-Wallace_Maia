import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollHide]',
  standalone: true,
})
export class ScrollHideDirective implements OnInit, OnDestroy {
  private lastScrollY = 0;
  private ticking = false;
  private readonly HIDE_THRESHOLD = 80;
  private readonly SCROLL_DELTA = 10;

  private progressBar: HTMLElement | null = null;

  private platformId = inject(PLATFORM_ID);

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.createProgressBar();
    this.processScroll();
  }

  ngOnDestroy(): void {
    this.progressBar = null;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.processScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private processScroll(): void {
    const scrollY = window.scrollY;

    this.updateScrolledState(scrollY);
    this.updateHiddenState(scrollY);
    this.updateProgressBar(scrollY);

    this.lastScrollY = scrollY;
  }

  private updateScrolledState(scrollY: number): void {
    if (scrollY > 24) {
      this.renderer.addClass(this.el.nativeElement, 'header--scrolled');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'header--scrolled');
    }
  }

  private updateHiddenState(scrollY: number): void {
    const delta = scrollY - this.lastScrollY;

    // Se o scroll estiver muito próximo do topo, garantir que o header não esteja escondido
    if (scrollY <= 5) {
      // Reduzindo o threshold para garantir visibilidade imediata no topo
      this.renderer.removeClass(this.el.nativeElement, 'header--hidden');
      return;
    }

    if (delta > this.SCROLL_DELTA && scrollY > this.HIDE_THRESHOLD) {
      this.renderer.addClass(this.el.nativeElement, 'header--hidden');
    } else if (delta < -this.SCROLL_DELTA) {
      this.renderer.removeClass(this.el.nativeElement, 'header--hidden');
    }
  }

  private updateProgressBar(scrollY: number): void {
    if (!this.progressBar) return;

    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      this.renderer.setStyle(this.progressBar, 'transform', 'scaleX(0)');
      return;
    }

    const progress = Math.min(scrollY / docHeight, 1);
    this.renderer.setStyle(
      this.progressBar,
      'transform',
      `scaleX(${progress})`,
    );
  }

  private createProgressBar(): void {
    this.progressBar = this.renderer.createElement('div');
    this.renderer.addClass(this.progressBar, 'nav-progress-bar');
    this.renderer.setStyle(this.progressBar, 'position', 'absolute');
    this.renderer.setStyle(this.progressBar, 'bottom', '0');
    this.renderer.setStyle(this.progressBar, 'left', '0');
    this.renderer.setStyle(this.progressBar, 'width', '100%');
    this.renderer.setStyle(this.progressBar, 'height', '2px');
    this.renderer.setStyle(this.progressBar, 'background', '#9B1B1F');
    this.renderer.setStyle(this.progressBar, 'transform', 'scaleX(0)');
    this.renderer.setStyle(this.progressBar, 'transform-origin', 'left');
    this.renderer.setStyle(
      this.progressBar,
      'transition',
      'transform 0.1s linear',
    );
    this.renderer.setStyle(this.progressBar, 'opacity', '0');
    this.renderer.setStyle(this.progressBar, 'pointer-events', 'none');
    this.renderer.appendChild(this.el.nativeElement, this.progressBar);
  }
}

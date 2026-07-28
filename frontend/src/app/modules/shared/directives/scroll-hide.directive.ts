import {
  Directive,
  ElementRef,
  HostListener,
  Input,
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
  private paused = false;
  private progressBar: HTMLElement | null = null;

  @Input() appScrollHideThreshold = 9;
  @Input() appScrollHideTopOffset = 80;
  @Input() appScrollHideHideAfter = 300;

  @Input()
  set appScrollHidePaused(value: boolean | string) {
    this.paused = value === '' || value === true || value === 'true';

    if (this.paused) {
      this.setHeaderVisibility(true);
    }
  }

  private platformId = inject(PLATFORM_ID);

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.createProgressBar();
    this.setHeaderVisibility(true);
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
    if (this.paused) {
      this.setHeaderVisibility(true);
      return;
    }

    const delta = scrollY - this.lastScrollY;

    if (scrollY < this.appScrollHideTopOffset) {
      this.setHeaderVisibility(true);
      return;
    }

    if (
      delta > this.appScrollHideThreshold &&
      scrollY >= this.appScrollHideHideAfter
    ) {
      this.setHeaderVisibility(false);
    } else if (delta < -this.appScrollHideThreshold) {
      this.setHeaderVisibility(true);
    }
  }

  private setHeaderVisibility(isVisible: boolean): void {
    if (isVisible) {
      this.renderer.setAttribute(this.el.nativeElement, 'data-state', 'visible');
      this.renderer.addClass(this.el.nativeElement, 'header-visible');
      this.renderer.removeClass(this.el.nativeElement, 'header-hidden');
      this.renderer.removeClass(this.el.nativeElement, 'header--hidden');
      return;
    }

    this.renderer.setAttribute(this.el.nativeElement, 'data-state', 'hidden');
    this.renderer.addClass(this.el.nativeElement, 'header-hidden');
    this.renderer.addClass(this.el.nativeElement, 'header--hidden');
    this.renderer.removeClass(this.el.nativeElement, 'header-visible');
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
    this.renderer.setStyle(
      this.progressBar,
      'background',
      'var(--color-primary)',
    );
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

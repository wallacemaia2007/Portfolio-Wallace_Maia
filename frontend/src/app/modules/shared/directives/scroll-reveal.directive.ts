import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealFrom: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
  @Input() revealDelay = 0;
  @Input() revealOnce = true;
  @Input() hideOnExit = false;

  private observer!: IntersectionObserver;
  private initialTransform = 'translateY(30px)';
  private hasRevealed = false;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private prefersReducedMotion = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.setInitialStyles();
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setInitialStyles(): void {
    if (this.prefersReducedMotion) {
      // Não esconder o elemento, revelar imediatamente
      return;
    }

    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(
      this.el.nativeElement,
      'will-change',
      'opacity, transform'
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    );

    switch (this.revealFrom) {
      case 'top':
        this.initialTransform = 'translateY(-30px)';
        break;
      case 'left':
        this.initialTransform = 'translateX(-30px)';
        break;
      case 'right':
        this.initialTransform = 'translateX(30px)';
        break;
      case 'bottom':
      default:
        this.initialTransform = 'translateY(30px)';
        break;
    }

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      this.initialTransform
    );
  }

  private setupIntersectionObserver(): void {
    if (this.prefersReducedMotion) {
      return; // Não observar, elemento já está visível
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasRevealed) {
            this.reveal();
          } else if (!entry.isIntersecting && this.hideOnExit && !this.revealOnce) {
            this.hide();
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-40px 0px',
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private reveal(): void {
    this.hasRevealed = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
        this.renderer.setStyle(
          this.el.nativeElement,
          'transform',
          'translate(0)'
        );

        if (this.revealOnce) {
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    });
  }

  private hide(): void {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      this.initialTransform
    );
  }
}
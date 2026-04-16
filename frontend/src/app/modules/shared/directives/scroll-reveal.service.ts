import { Injectable, OnDestroy } from '@angular/core';

interface RevealOptions {
  element: HTMLElement;
  onReveal: () => void;
  threshold?: number;
  rootMargin?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScrollRevealService implements OnDestroy {
  private observer: IntersectionObserver;
  private revealedElements = new Set<HTMLElement>();
  private callbacks = new Map<HTMLElement, () => void>();

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = this.callbacks.get(entry.target as HTMLElement);
            if (callback) {
              callback();
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-40px 0px',
      }
    );
  }

  observe(options: RevealOptions): void {
    const { element, onReveal, threshold = 0.15, rootMargin = '-40px 0px' } = options;

    if (this.revealedElements.has(element)) {
      return;
    }

    this.callbacks.set(element, () => {
      if (!this.revealedElements.has(element)) {
        this.revealedElements.add(element);
        onReveal();
        this.unobserve(element);
      }
    });

    this.observer.observe(element);
  }

  unobserve(element: HTMLElement): void {
    this.observer.unobserve(element);
    this.callbacks.delete(element);
  }

  reset(): void {
    this.revealedElements.clear();
    this.callbacks.clear();
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
    this.callbacks.clear();
    this.revealedElements.clear();
  }
}
import { Component, OnInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TranslateService } from '../../../../core/services/translate.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss',
})
export class CtaComponent implements OnInit, OnDestroy {
  readonly translate = inject(TranslateService);

  get whatsappLink(): string {
    const msg = encodeURIComponent(this.translate.translate('whatsapp.generic'));
    return `https://wa.me/5535910036806?text=${msg}`;
  }

  private bgEl: HTMLElement | null = null;
  private sectionEl: HTMLElement | null = null;
  private rafId: number | null = null;
  private readonly parallaxStrength = 0.35; // 0 = sem efeito, 1 = move igual ao scroll

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.sectionEl = this.elRef.nativeElement.querySelector('.cta-section');
      this.bgEl = this.elRef.nativeElement.querySelector('.cta-bg-image');
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.onScroll();
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  private onScroll = (): void => {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.applyParallax();
    });
  };

  private applyParallax(): void {
    if (window.innerWidth < 768) return;
    if (!this.bgEl || !this.sectionEl) return;

    const rect = this.sectionEl.getBoundingClientRect();
    const viewH = window.innerHeight;

    if (rect.bottom < 0 || rect.top > viewH) return;

    const progress = (viewH - rect.top) / (viewH + rect.height);
    const offset = (progress - 0.5) * rect.height * this.parallaxStrength;

    this.bgEl.style.transform = `translateY(${offset.toFixed(1)}px)`;
  }

  scrollTo(event: Event, target: string): void {
    event.preventDefault();
    const el = document.querySelector<HTMLElement>(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
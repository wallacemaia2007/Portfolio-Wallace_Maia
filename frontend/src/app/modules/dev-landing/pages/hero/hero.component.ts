import {
  Component,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnDestroy, AfterViewInit {
  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;

  private ctx?: gsap.Context;
  private prefersReducedMotion = false;

  readonly personalInfo = {
    fullName: 'Wallace Maia',
    role: 'Desenvolvedor Full Stack',
    avatar: 'assets/images/avatar.jpeg',
  };

  readonly techPills = ['Angular', 'Java', 'Spring Boot', 'TypeScript'];

  fallbackAvatar = 'assets/images/avatar.jpeg';

  ngAfterViewInit(): void {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) return;

    setTimeout(() => {
      this.initAnimations();
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.8 } });

      tl.from('.hero-tag', { opacity: 0, y: 30, duration: 0.5 })
        .from('.hero-title', { opacity: 0, y: 30 }, '-=0.4')
        .from('.hero-role', { opacity: 0, y: 30 }, '-=0.5')
        .from('.hero-bio', { opacity: 0, y: 30 }, '-=0.4')
        .from('.hero-buttons a', { opacity: 0, y: 20, stagger: 0.1 }, '-=0.3')
        .from('.hero-pills span', { opacity: 0, y: 20, stagger: 0.08 }, '-=0.3')
        .from('.hero-available', { opacity: 0, y: 20 }, '-=0.2')
        .from('.hero-preview-card', { opacity: 0, x: 60, duration: 1 }, '-=1')
        .from('.hero-preview-floating', { opacity: 0, scale: 0.9, stagger: 0.12 }, '-=0.6')
        .from('.hero-badge', {
          opacity: 0,
          scale: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: 'back.out(2)',
        }, '-=0.5');
    }, this.heroSection.nativeElement);
  }

  scrollTo(event: Event, target: string): void {
    event.preventDefault();
    const el = document.querySelector<HTMLElement>(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.fallbackAvatar;
  }
}

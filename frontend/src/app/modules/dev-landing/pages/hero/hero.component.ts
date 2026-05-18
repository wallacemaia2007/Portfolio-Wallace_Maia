import {
  Component,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  NgZone,
  HostListener,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { gsap } from '../../../../core/gsap-register';
import { TranslateService } from '../../../../core/services/translate.service';

// ══ Classes de partícula (igual ao login/signup) ══

class HeroParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 1.1 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.12;
    this.speedY = (Math.random() - 0.5) * 0.12;
    this.opacity = Math.random() * 0.2 + 0.25;
  }

  update(
    mouse: { x: number; y: number },
    width: number,
    height: number,
    rect: DOMRect,
  ) {
    this.x += this.speedX;
    this.y += this.speedY;

    const mx = mouse.x - rect.left;
    const my = mouse.y - rect.top;
    const dx = mx - this.x;
    const dy = my - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = 140;

    if (distance < radius) {
      const force = (radius - distance) / radius;
      this.x -= (dx / distance) * force * 3.5;
      this.y -= (dy / distance) * force * 3.5;
    }

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Partículas em tom teal/ciano para combinar com a paleta do hero
    ctx.fillStyle = `rgba(94, 234, 212, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnDestroy, AfterViewInit {
  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  readonly translate = inject(TranslateService);
  private ctx?: gsap.Context;
  private prefersReducedMotion = false;

  // ── Partículas ──
  private particleCtx: CanvasRenderingContext2D | null = null;
  private particles: HeroParticle[] = [];
  private animationId?: number;
  private canvasWidth = 0;
  private canvasHeight = 0;
  private mouse = { x: -9999, y: -9999 };

  readonly personalInfo = {
    fullName: 'Wallace Maia',
    role: this.translate.translate('devHero.role'),
    avatar: 'assets/images/avatar.png',
  };

  readonly techPills = ['Angular', 'Java', 'Spring Boot', 'TypeScript'];
  
  readonly ctaLinks = {
    contact: '#contact',
    cv: '/assets/cv.pdf',
    whatsapp: 'https://wa.me/5535910036806',
    github: 'https://github.com/wallacemaia2007',
    linkedin: 'https://www.linkedin.com/in/wallacemaia-dev/',
    instagram: 'https://www.instagram.com/',
  };

  fallbackAvatar = 'assets/images/avatar.jpeg';

  constructor(private readonly ngZone: NgZone) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeParticleCanvas();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // Inicia partículas fora da zona Angular para melhor performance
    this.ngZone.runOutsideAngular(() => {
      this.initParticles();
      this.animateParticles();
    });

    if (!this.prefersReducedMotion) {
      setTimeout(() => {
        this.initAnimations();
      }, 300);
    }
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.particles = [];
    this.particleCtx = null;
  }

  // ══ Canvas de partículas ══

  private initParticles(): void {
    if (!this.particleCanvas) return;
    const canvas = this.particleCanvas.nativeElement;
    this.particleCtx = canvas.getContext('2d', { alpha: true });
    this.resizeParticleCanvas();

    const count = 1200;
    for (let i = 0; i < count; i++) {
      this.particles.push(
        new HeroParticle(this.canvasWidth, this.canvasHeight),
      );
    }
  }

  private resizeParticleCanvas(): void {
    if (!this.particleCanvas) return;
    const canvas = this.particleCanvas.nativeElement;
    const parent = canvas.parentElement!;
    this.canvasWidth = parent.clientWidth;
    this.canvasHeight = parent.clientHeight;

    const ctx = this.particleCtx ?? canvas.getContext('2d', { alpha: true });
    if (ctx) {
      const dpr = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = Math.floor(this.canvasWidth * dpr);
      canvas.height = Math.floor(this.canvasHeight * dpr);
      canvas.style.width = `${this.canvasWidth}px`;
      canvas.style.height = `${this.canvasHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!this.particleCtx) this.particleCtx = ctx;
    }
  }

  private animateParticles(): void {
    if (!this.particleCtx) return;
    const ctx = this.particleCtx;
    const canvas = this.particleCanvas?.nativeElement;

    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      this.particles.forEach((p) => {
        p.update(this.mouse, this.canvasWidth, this.canvasHeight, rect);
        p.draw(ctx);
      });
    }

    this.animationId = requestAnimationFrame(() => this.animateParticles());
  }

  // ══ GSAP Animations ══

  private initAnimations(): void {
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 0.8 },
      });

      tl.from('.hero-tag', { opacity: 0, y: 30, duration: 0.5 })
        .from('.hero-title', { opacity: 0, y: 30 }, '-=0.4')
        .from('.hero-role', { opacity: 0, y: 30 }, '-=0.5')
        .from('.hero-bio', { opacity: 0, y: 30 }, '-=0.4')
        .from('.hero-buttons a', { opacity: 0, y: 20, stagger: 0.1 }, '-=0.3')
        .from('.hero-preview-card', { opacity: 0, x: 60, duration: 1 }, '-=1')
        .from(
          '.hero-preview-floating',
          { opacity: 0, scale: 0.9, stagger: 0.12 },
          '-=0.6',
        )
        .from(
          '.hero-badge',
          {
            opacity: 0,
            scale: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: 'back.out(2)',
          },
          '-=0.5',
        );
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

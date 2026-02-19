import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';

import { PortfolioService } from '../../../portfolio/services/portfolio.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  private ngZone = inject(NgZone);

  @ViewChild('host', { static: false, read: ElementRef })
  hostRef?: ElementRef<HTMLElement>;
  private ctx?: gsap.Context;

  theme: string | null = null;
  personalInfo: any = {
    name: '',
    role: '',
    description: '',
    avatar: '',
  };

  private typingRafId: number | null = null;

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe((info) => {
      this.personalInfo = info;
    });

    this.theme = localStorage.getItem('theme');
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const scope = document.querySelector(
        'app-hero-section',
      ) as HTMLElement | null;
      if (!scope) return;

      this.ctx = gsap.context(() => {
        gsap.set(
          '[data-hero-kicker], [data-hero-name], [data-hero-role], [data-hero-stack], [data-hero-desc], [data-hero-actions], [data-hero-terminal]',
          {
            opacity: 0,
            y: 18,
          },
        );

        gsap.set('[data-hero-avatar-wrap]', { opacity: 0, scale: 0.92 });
        gsap.set('[data-hero-glow-1], [data-hero-glow-2]', { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to('[data-hero-kicker]', { opacity: 1, y: 0, duration: 0.6 })
          .to('[data-hero-name]', { opacity: 1, y: 0, duration: 0.7 }, '-=0.35')
          .to('[data-hero-role]', { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
          .to(
            '[data-hero-stack]',
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.35',
          )
          .to('[data-hero-desc]', { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
          .to(
            '[data-hero-actions]',
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.35',
          )
          .to(
            '[data-hero-terminal]',
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.25',
          )
          .to(
            '[data-hero-avatar-wrap]',
            { opacity: 1, scale: 1, duration: 0.8 },
            '-=0.85',
          )
          .to(
            '[data-hero-glow-1], [data-hero-glow-2]',
            { opacity: 1, duration: 0.8 },
            '-=0.7',
          );

        gsap.to('[data-hero-wave]', {
          rotate: 18,
          transformOrigin: '70% 70%',
          duration: 0.25,
          yoyo: true,
          repeat: 5,
          ease: 'power1.inOut',
          delay: 0.3,
        });

        gsap.to('[data-hero-avatar-wrap]', {
          y: -10,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.8,
        });

        gsap.to('[data-hero-cursor]', {
          opacity: 0,
          duration: 0.55,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        });

        this.startTyping(
          '[data-hero-typed]',
          [
            'npm run build',
            'deploy --target=web',
            'Olá! Eu sou o Wallace 👋',
            'Crio apps com Angular + Java + Spring Boot',
            'Vamos construir algo incrível?',
          ],
          22,
          900,
        );
      }, scope);
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    if (this.typingRafId) {
      cancelAnimationFrame(this.typingRafId);
      this.typingRafId = null;
    }
  }

  downloadCV(): void {
    window.open('assets/cv.pdf', '_blank');
  }

  private startTyping(
    targetSelector: string,
    phrases: string[],
    msPerChar = 25,
    pauseMs = 800,
  ): void {
    const el = document.querySelector(targetSelector) as HTMLElement | null;
    if (!el || !phrases.length) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let lastTime = performance.now();
    let nextDelay = msPerChar;

    const tick = (now: number) => {
      const delta = now - lastTime;
      if (delta >= nextDelay) {
        lastTime = now;

        const current = phrases[phraseIndex];

        if (!isDeleting) {
          charIndex++;
          el.textContent = current.slice(0, charIndex);

          if (charIndex >= current.length) {
            isDeleting = true;
            nextDelay = pauseMs;
          } else {
            nextDelay = msPerChar;
          }
        } else {
          charIndex--;
          el.textContent = current.slice(0, Math.max(0, charIndex));

          if (charIndex <= 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            nextDelay = 220;
          } else {
            nextDelay = Math.max(12, msPerChar * 0.55);
          }
        }
      }

      this.typingRafId = requestAnimationFrame(tick);
    };

    this.typingRafId = requestAnimationFrame(tick);
  }
}

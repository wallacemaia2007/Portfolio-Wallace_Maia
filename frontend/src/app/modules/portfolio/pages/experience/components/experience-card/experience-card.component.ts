import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  Experience,
  ExperienceType,
  EXPERIENCE_TYPE_NAMES,
} from '../../../../models/experience.model';
import { gsap, ScrollTrigger } from '../../../../../../core/gsap-register';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss',
})
export class ExperienceCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) experience!: Experience;
  @Input() cardIndex: number = 0;

  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ctx?: gsap.Context;
  private mouseMoveHandler!: (e: MouseEvent) => void;

  duration = '';
  typeIcon = '';
  typeLabel = '';

  ngOnInit(): void {
    this.calculateDuration();
    this.setTypeInfo();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Defer to next tick so DOM is fully rendered
    setTimeout(() => {
      this.ctx = gsap.context(() => {
        this.initScrollAnimation();
        this.initParallax();
        this.initHoverEffects();
        this.initTechTagsAnimation();
      }, this.el.nativeElement);
    }, 50);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    const article = this.el.nativeElement.querySelector('article');
    if (article && this.mouseMoveHandler) {
      article.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }

  // ─── Scroll-triggered entrance animation ───────────────────────────────────

  private initScrollAnimation(): void {
    const article = this.el.nativeElement.querySelector('article');
    const title = this.el.nativeElement.querySelector('.card-title');
    const badge = this.el.nativeElement.querySelector('.card-badge');
    const description = this.el.nativeElement.querySelector('.card-description');
    const infoItems = this.el.nativeElement.querySelectorAll('.info-item');
    const techs = this.el.nativeElement.querySelector('.card-techs');

    // Set initial states
    gsap.set(article, { opacity: 0, y: 60, scale: 0.97 });
    gsap.set(title, { opacity: 0, x: -30 });
    gsap.set(badge, { opacity: 0, x: 30, scale: 0.85 });
    gsap.set(description, { opacity: 0, y: 20 });
    gsap.set(infoItems, { opacity: 0, y: 20, scale: 0.95 });
    if (techs) gsap.set(techs, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: article,
        start: 'top 88%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(article, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'expo.out',
      delay: this.cardIndex * 0.08,
    })
      .to(title, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .to(badge, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.4')
      .to(description, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
      .to(infoItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.2')
      .to(techs, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1');
  }

  // ─── Mouse parallax effect ──────────────────────────────────────────────────

  private initParallax(): void {
    const article = this.el.nativeElement.querySelector('article');
    const orb1 = this.el.nativeElement.querySelector('.parallax-orb-1');
    const orb2 = this.el.nativeElement.querySelector('.parallax-orb-2');
    const gradient = this.el.nativeElement.querySelector('.card-gradient');

    if (!article) return;

    this.mouseMoveHandler = (e: MouseEvent) => {
      const rect = article.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (e.clientX - rect.left - cx) / cx; // -1 to 1
      const dy = (e.clientY - rect.top - cy) / cy;  // -1 to 1

      // Card tilt
      gsap.to(article, {
        rotateY: dx * 4,
        rotateX: -dy * 4,
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      // Orbs parallax
      if (orb1) {
        gsap.to(orb1, { x: dx * 20, y: dy * 20, duration: 0.8, ease: 'power2.out' });
      }
      if (orb2) {
        gsap.to(orb2, { x: -dx * 15, y: -dy * 15, duration: 0.8, ease: 'power2.out' });
      }

      // Gradient reveal
      if (gradient) {
        gsap.to(gradient, { opacity: 1, duration: 0.4 });
      }
    };

    const mouseLeaveHandler = () => {
      gsap.to(article, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
      if (orb1) gsap.to(orb1, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
      if (orb2) gsap.to(orb2, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
      if (gradient) gsap.to(gradient, { opacity: 0, duration: 0.5 });
    };

    article.addEventListener('mousemove', this.mouseMoveHandler);
    article.addEventListener('mouseleave', mouseLeaveHandler);
  }

  // ─── Hover: card border + title glow ───────────────────────────────────────

  private initHoverEffects(): void {
    const article = this.el.nativeElement.querySelector('article');
    const title = this.el.nativeElement.querySelector('.card-title');
    const infoIcons = this.el.nativeElement.querySelectorAll('.info-icon');
    const linkIcon = this.el.nativeElement.querySelector('.link-icon');
    const companyLink = this.el.nativeElement.querySelector('.company-link');

    if (!article) return;

    // Info icon bounce on card hover
    article.addEventListener('mouseenter', () => {
      gsap.to(infoIcons, {
        scale: 1.1,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(2)',
      });
      if (title) {
        gsap.to(title, { color: 'var(--primary)', duration: 0.3 });
      }
    });

    article.addEventListener('mouseleave', () => {
      gsap.to(infoIcons, {
        scale: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
      });
    });

    // Company link icon reveal
    if (companyLink && linkIcon) {
      companyLink.addEventListener('mouseenter', () => {
        gsap.to(linkIcon, { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' });
      });
      companyLink.addEventListener('mouseleave', () => {
        gsap.to(linkIcon, { opacity: 0, x: -8, duration: 0.2 });
      });
    }
  }

  // ─── Tech tags staggered wave on scroll ────────────────────────────────────

  private initTechTagsAnimation(): void {
    const tags = this.el.nativeElement.querySelectorAll('.tech-tag');
    if (!tags.length) return;

    gsap.set(tags, { opacity: 0, scale: 0.7, y: 10 });

    ScrollTrigger.create({
      trigger: this.el.nativeElement.querySelector('.card-techs'),
      start: 'top 92%',
      onEnter: () => {
        gsap.to(tags, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: {
            each: 0.06,
            ease: 'power1.in',
          },
          ease: 'back.out(1.5)',
        });
      },
      onLeaveBack: () => {
        gsap.to(tags, { opacity: 0, scale: 0.7, y: 10, duration: 0.25, stagger: 0.03 });
      },
    });

    // Individual hover bounce
    tags.forEach((tag: HTMLElement) => {
      tag.addEventListener('mouseenter', () => {
        gsap.to(tag, { scale: 1.15, y: -4, duration: 0.2, ease: 'back.out(2)' });
      });
      tag.addEventListener('mouseleave', () => {
        gsap.to(tag, { scale: 1, y: 0, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private calculateDuration(): void {
    const start = new Date(this.experience.startDate);
    const end =
      this.experience.endDate && this.experience.endDate !== 'momento'
        ? new Date(this.experience.endDate)
        : new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0 && months === 0) {
      this.duration = 'Menos de 1 mês';
    } else if (years === 0) {
      this.duration = `${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else if (months === 0) {
      this.duration = `${years} ${years === 1 ? 'ano' : 'anos'}`;
    } else {
      this.duration = `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${
        months === 1 ? 'mês' : 'meses'
      }`;
    }
  }

  private setTypeInfo(): void {
    this.typeLabel = EXPERIENCE_TYPE_NAMES[this.experience.type];
    this.typeIcon = this.getTypeIcon(this.experience.type);
  }

  private getTypeIcon(type: ExperienceType): string {
    const icons: Record<ExperienceType, string> = {
      'full-time': 'work',
      'part-time': 'schedule',
      freelance: 'person',
      internship: 'school',
      contract: 'description',
    };
    return icons[type] || 'work';
  }

  formatDate(dateString: string): string {
    if (dateString === 'momento') return 'Presente';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }
}
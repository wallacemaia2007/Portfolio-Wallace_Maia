import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { WhatsAppService } from '../../../shared/services/whatsapp-service.service';
import { gsap } from '../../../../core/gsap-register';
import { TranslateService } from '../../../../core/services/translate.service';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  phrase: string;
  services: string[];
  stack: string[];
  buildingType: string;
  maxHeight?: number;
}

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ScrollRevealDirective,
    SectionHeaderComponent,
  ],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent implements AfterViewInit, OnDestroy {
  @ViewChild('worksSection', { static: true }) worksSection!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private ctx?: gsap.Context;
  private prefersReducedMotion = false;
  activeCategoryId: string | null = null;
  buildingHeights: Record<string, number> = {};

  private whatsAppService = inject(WhatsAppService);
  readonly translate = inject(TranslateService);

  get categories(): ServiceCategory[] {
    const t = (key: string) => this.translate.translate('devWorks.' + key);
    const result: ServiceCategory[] = [
      {
        id: 'systems',
        name: t('cat01Name'),
        icon: 'domain',
        phrase: t('cat01Phrase'),
        services: [t('cat01Svc01'), t('cat01Svc02'), t('cat01Svc03'), t('cat01Svc04'), t('cat01Svc05')],
        stack: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'REST API', 'Docker', 'JWT', 'Hibernate'],
        buildingType: 'skyscraper',
      },
      {
        id: 'webapps',
        name: t('cat02Name'),
        icon: 'web',
        phrase: t('cat02Phrase'),
        services: [t('cat02Svc01'), t('cat02Svc02'), t('cat02Svc03'), t('cat02Svc04'), t('cat02Svc05')],
        stack: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'SCSS', 'Node.js', 'Java'],
        buildingType: 'commercial',
      },
      {
        id: 'ecommerce',
        name: t('cat03Name'),
        icon: 'storefront',
        phrase: t('cat03Phrase'),
        services: [t('cat03Svc01'), t('cat03Svc02'), t('cat03Svc03'), t('cat03Svc04'), t('cat03Svc05')],
        stack: ['Angular', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'REST API'],
        buildingType: 'shop',
      },
      {
        id: 'sites',
        name: t('cat04Name'),
        icon: 'web_asset',
        phrase: t('cat04Phrase'),
        services: [t('cat04Svc01'), t('cat04Svc02'), t('cat04Svc03'), t('cat04Svc04'), t('cat04Svc05')],
        stack: ['Angular', 'Tailwind CSS', 'GSAP', 'SEO', 'TypeScript', 'Vercel'],
        buildingType: 'agency',
      },
      {
        id: 'branding',
        name: t('cat05Name'),
        icon: 'brush',
        phrase: t('cat05Phrase'),
        services: [t('cat05Svc01'), t('cat05Svc02'), t('cat05Svc03'), t('cat05Svc04'), t('cat05Svc05')],
        stack: ['Figma', 'Angular', 'Tailwind CSS', 'SCSS', 'GSAP'],
        buildingType: 'studio',
      },
      {
        id: 'automation',
        name: t('cat06Name'),
        icon: 'hub',
        phrase: t('cat06Phrase'),
        services: [t('cat06Svc01'), t('cat06Svc02'), t('cat06Svc03'), t('cat06Svc04'), t('cat06Svc05')],
        stack: ['REST API', 'GraphQL', 'Webhooks', 'OAuth', 'Node.js', 'Python', 'n8n'],
        buildingType: 'tower',
      },
      {
        id: 'maintenance',
        name: t('cat07Name'),
        icon: 'build',
        phrase: t('cat07Phrase'),
        services: [t('cat07Svc01'), t('cat07Svc02'), t('cat07Svc03'), t('cat07Svc04'), t('cat07Svc05')],
        stack: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Jest', 'Spring Boot'],
        buildingType: 'workshop',
      },
      {
        id: 'consulting',
        name: t('cat08Name'),
        icon: 'lightbulb',
        phrase: t('cat08Phrase'),
        services: [t('cat08Svc01'), t('cat08Svc02'), t('cat08Svc03'), t('cat08Svc04'), t('cat08Svc05')],
        stack: ['Arquitetura Web', 'UX/UI', 'SEO', 'Angular', 'Spring Boot'],
        buildingType: 'headquarters',
      },
    ];
    const allScores = result.map(
      (c) => c.services.length * 10 + c.stack.length * 4 + c.phrase.length * 0.12,
    );
    const min = Math.min(...allScores);
    const max = Math.max(...allScores);
    result.forEach((cat, i) => {
      cat.maxHeight = Math.round(45 + ((allScores[i] - min) / (max - min)) * 50);
    });
    return result;
  }

  constructor() {
    this.randomizeHeights(null);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (this.prefersReducedMotion) return;
    setTimeout(() => this.initAnimations(), 300);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  private initAnimations(): void {
    if (!this.worksSection) return;
    this.ctx = gsap.context(() => {
      gsap.fromTo(
        '.building',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: this.worksSection.nativeElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, this.worksSection.nativeElement);
  }

  private randomizeHeights(selectedId: string | null): void {
    const heights: Record<string, number> = {};
    for (const cat of this.categories) {
      const max = cat.maxHeight ?? 60;
      if (cat.id === selectedId) {
        heights[cat.id] = max;
      } else {
        const lo = Math.round(max * 0.28);
        const hi = Math.round(max * 0.72);
        heights[cat.id] = lo + Math.floor(Math.random() * (hi - lo + 1));
      }
    }
    this.buildingHeights = heights;
  }

  selectCategory(id: string): void {
    this.activeCategoryId = this.activeCategoryId === id ? null : id;
    this.randomizeHeights(this.activeCategoryId);
  }

  get activeCategory(): ServiceCategory | undefined {
    return this.categories.find((c) => c.id === this.activeCategoryId);
  }

  getBuildingHeight(catId: string): string {
    return (this.buildingHeights[catId] ?? 45) + '%';
  }

  moreInfo(projectTitle: string): void {
    const link = this.whatsAppService.getWorkDetailsLink(projectTitle);
    window.open(link, '_blank');
  }
}

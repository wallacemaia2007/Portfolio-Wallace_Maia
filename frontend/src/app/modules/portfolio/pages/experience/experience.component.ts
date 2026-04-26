import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PortfolioService } from '../../services/portfolio.service';
import {
  Experience,
  ExperienceType,
  EXPERIENCE_TYPE_NAMES,
} from '../../models/experience.model';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { ExperienceCardComponent } from './components/experience-card/experience-card.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import {
  InformationBarComponent,
  InformationBarData,
} from '../../../shared/components/information-bar/information-bar.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceTypeInfo {
  value: ExperienceType | 'all';
  label: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    ScrollRevealDirective,
    ExperienceCardComponent,
    SectionHeaderComponent,
    InformationBarComponent,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  private el = inject(ElementRef);
  private ctx!: gsap.Context;

  isLoading = true;
  experiences: Experience[] = [];
  selectedType: ExperienceType | 'all' = 'all';
  experienceTypes: ExperienceTypeInfo[] = [];

  ctaData: InformationBarData = {
    title: 'Gostou da minha trajetória?',
    description: 'Vamos trabalhar juntos e criar algo incrível!',
    buttons: [
      { label: 'Ver Projetos', icon: 'work', color: 'theme', link: '/projects' },
      { label: 'Entrar em Contato', icon: 'email', color: 'theme', link: '/contact' },
    ],
  };

  ngOnInit(): void {
    this.loadExperiences();
  }

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      this.initHeroParallax();
    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }

  // ─── Hero blobs parallax on scroll ─────────────────────────────────────────

  private initHeroParallax(): void {
    const blob1 = this.el.nativeElement.querySelector('.hero-blob-1');
    const blob2 = this.el.nativeElement.querySelector('.hero-blob-2');
    const blob3 = this.el.nativeElement.querySelector('.hero-blob-3');
    const heroContent = this.el.nativeElement.querySelector('.hero-content');
    const hero = this.el.nativeElement.querySelector('.experience-hero');

    if (!hero) return;

    // Blobs move at different speeds on scroll (parallax layers)
    if (blob1) {
      gsap.to(blob1, {
        y: -80,
        x: 30,
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });
    }

    if (blob2) {
      gsap.to(blob2, {
        y: -50,
        x: -20,
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }

    if (blob3) {
      gsap.to(blob3, {
        y: -120,
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 2 },
      });
    }

    // Hero content fades up slightly as user scrolls past
    if (heroContent) {
      gsap.to(heroContent, {
        y: -40,
        opacity: 0.6,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }

  // ─── Data ──────────────────────────────────────────────────────────────────

  private loadExperiences(): void {
    this.isLoading = true;

    this.portfolioService.getExperience().subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        this.buildExperienceTypes();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar experiências:', error);
        this.isLoading = false;
      },
    });
  }

  private buildExperienceTypes(): void {
    const typeCounts = new Map<ExperienceType, number>();

    this.experiences.forEach((experience) => {
      const count = typeCounts.get(experience.type) || 0;
      typeCounts.set(experience.type, count + 1);
    });

    this.experienceTypes = Array.from(typeCounts.entries()).map(([type, count]) => ({
      value: type,
      label: EXPERIENCE_TYPE_NAMES[type],
      icon: this.getTypeIcon(type),
      count,
    }));

    this.experienceTypes.sort((a, b) => b.count - a.count);
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
}
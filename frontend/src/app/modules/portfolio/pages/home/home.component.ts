import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroSectionComponent } from '../../../shared/components/hero-section/hero-section.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SocialLinksComponent } from '../../../shared/components/social-links/social-links.component';
import { ProjectCardComponent } from '../projects/components/project-card/project-card.component';
import { ProjectModalComponent } from '../projects/components/project-modal/project-modal.component';
import { PortfolioService } from '../../services/portfolio.service';
import {
  Project,
  ProjectCategory,
  PROJECT_CATEGORY_NAMES,
} from '../../models/project.model';
import {
  SkillGroup,
  SKILL_CATEGORY_ICONS,
  SKILL_CATEGORY_NAMES,
  SkillCategoryType,
} from '../../models/skill.model';
import { Experience } from '../../models/experience.model';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import {
  InformationBarComponent,
  InformationBarData,
} from '../../../shared/components/information-bar/information-bar.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    HeroSectionComponent,
    SectionHeaderComponent,
    ScrollRevealDirective,
    InformationBarComponent,
    ButtonComponent,
    RouterLink,
    ProjectCardComponent,
    ProjectModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  private el = inject(ElementRef);
  private ctx!: gsap.Context;
  private playingPreviewIds = new Set<string>();

  @ViewChild('experienceSection') experienceSectionRef!: ElementRef;
  @ViewChild('timelineContainer') timelineContainerRef!: ElementRef;
  @ViewChildren('timelineItem') timelineItemsRef!: QueryList<ElementRef>;

  featuredProjects: Project[] = [];
  isLoadingProjects = true;
  selectedProject: Project | null = null;

  skillCategories: SkillGroup[] = [];
  isLoadingSkills = true;

  recentExperiences: Experience[] = [];
  isLoadingExperience = true;

  statistics: Array<{ value: string; label: string; suffix?: string }> = [];

  ctaData: InformationBarData = {
    title: 'Vamos Trabalhar Juntos?',
    description:
      'Estou sempre aberto a novos projetos e oportunidades interessantes. Entre em contato e vamos criar algo incrível!',
    buttons: [
      {
        label: 'Entrar em Contato',
        icon: 'email',
        color: 'theme',
        link: '/contact',
      },
      {
        label: 'Download CV',
        icon: 'download',
        color: 'theme',
        link: 'assets/cv.pdf',
      },
    ],
  };

  ngOnInit(): void {
    this.loadFeaturedProjects();
    this.loadSkillsOverview();
    this.loadRecentExperience();
    this.loadStatistics();
  }

  ngAfterViewInit(): void {
    // Experiences load async — watch for them to render then animate
    this.ctx = gsap.context(() => {}, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  // ─── Called after experiences render ───────────────────────────────────────

  private initTimelineAnimations(): void {
    // Give Angular one more tick to render the *ngFor items
    setTimeout(() => {
      this.ctx = gsap.context(() => {
        this.animateTimelineItems();
      }, this.el.nativeElement);
    }, 80);
  }

  private animateTimelineItems(): void {
    const items = this.el.nativeElement.querySelectorAll(
      '.experience-timeline-item',
    );

    items.forEach((item: HTMLElement, i: number) => {
      const dot = item.querySelector('.timeline-dot');
      const line = item.querySelector('.timeline-line');
      const card = item.querySelector('.experience-home-card');
      const chips = item.querySelectorAll('.tech-chip');
      const gradient = item.querySelector('.card-hover-gradient');

      // ── Scroll entrance ──────────────────────────────────────────────────

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 87%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Dot pops in
      if (dot) {
        tl.to(dot, {
          scale: 1,
          duration: 0.45,
          ease: 'back.out(2)',
          delay: i * 0.1,
        });
      }

      // 2. Line draws downward
      if (line) {
        tl.to(
          line,
          {
            scaleY: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.15',
        );
      }

      // 3. Card slides in from right
      if (card) {
        tl.to(
          card,
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: 'expo.out',
          },
          '-=0.5',
        );
      }

      // 4. Tech chips stagger
      if (chips.length) {
        gsap.set(chips, { opacity: 0, scale: 0.75, y: 6 });
        tl.to(
          chips,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: 'back.out(1.5)',
          },
          '-=0.2',
        );
      }

      // ── Hover ──────────────────────────────────────────────────────────────

      if (!card) return;

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out' });
        if (gradient) gsap.to(gradient, { opacity: 1, duration: 0.3 });
        if (dot)
          gsap.to(dot, { scale: 1.15, duration: 0.25, ease: 'back.out(2)' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
        if (gradient) gsap.to(gradient, { opacity: 0, duration: 0.3 });
        if (dot) gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });

      // ── Tech chip hover bounce ─────────────────────────────────────────────

      chips.forEach((chip) => {
        const chipEl = chip as HTMLElement;
        chipEl.addEventListener('mouseenter', () => {
          gsap.to(chipEl, {
            scale: 1.1,
            y: -2,
            duration: 0.2,
            ease: 'back.out(2)',
          });
        });
        chipEl.addEventListener('mouseleave', () => {
          gsap.to(chipEl, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });
    });
  }

  // ─── Data loaders ──────────────────────────────────────────────────────────

  private loadFeaturedProjects(): void {
    this.isLoadingProjects = true;
    this.portfolioService.getFeaturedProjects().subscribe({
      next: (projects) => {
        this.featuredProjects = projects.slice(0, 3);
        this.isLoadingProjects = false;
        setTimeout(() => {
          document
            .querySelectorAll<HTMLVideoElement>('.project-card video')
            .forEach((video) => video.load());
        }, 300);
      },
      error: (error) => {
        console.error('Erro ao carregar projetos em destaque:', error);
        this.isLoadingProjects = false;
      },
    });
  }

  private loadSkillsOverview(): void {
    this.isLoadingSkills = true;
    this.portfolioService.getSkillsByCategory().subscribe({
      next: (skillsGrouped) => {
        this.skillCategories = Object.entries(skillsGrouped).map(
          ([category, skills]) => ({
            category: category as any,
            categoryName:
              SKILL_CATEGORY_NAMES[category as SkillCategoryType] || category,
            icon: SKILL_CATEGORY_ICONS[category as SkillCategoryType],
            skills: skills,
          }),
        );
        this.isLoadingSkills = false;
      },
      error: (error) => {
        console.error('Erro ao carregar skills:', error);
        this.isLoadingSkills = false;
      },
    });
  }

  private loadRecentExperience(): void {
    this.isLoadingExperience = true;
    this.portfolioService.getExperience().subscribe({
      next: (experiences) => {
        this.recentExperiences = experiences.slice(0, 3);
        this.isLoadingExperience = false;
        // Trigger GSAP after Angular renders the list
        this.initTimelineAnimations();
      },
      error: (error) => {
        console.error('Erro ao carregar experiências:', error);
        this.isLoadingExperience = false;
      },
    });
  }

  private loadStatistics(): void {
    this.portfolioService.getStatistics().subscribe({
      next: (stats) => {
        this.statistics = [
          {
            value: stats.completedProjects.toString(),
            label: 'Projetos Concluídos',
          },
          {
            value: stats.yearsExperience.toString(),
            label: 'Anos de Experiência',
            suffix: '+',
          },
          {
            value: stats.technologies.toString(),
            label: 'Tecnologias',
            suffix: '+',
          },
          {
            value: stats.happyClients.toString(),
            label: 'Clientes Satisfeitos',
            suffix: '+',
          },
        ];
      },
      error: () => {
        this.statistics = [
          { value: '0', label: 'Projetos Concluídos' },
          { value: '0', label: 'Anos de Experiência', suffix: '+' },
          { value: '0', label: 'Tecnologias', suffix: '+' },
          { value: '0', label: 'Clientes Satisfeitos', suffix: '+' },
        ];
      },
    });
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  openProjectModal(project: Project): void {
    this.selectedProject = project;
  }
  closeProjectModal(): void {
    this.selectedProject = null;
  }

  formatDate(dateString: string): string {
    if (!dateString || dateString === 'momento') return 'Presente';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    });
  }

  getCategoryLabel(category: ProjectCategory): string {
    return PROJECT_CATEGORY_NAMES[category];
  }

  getCategoryIcon(category: ProjectCategory): string {
    const icons: Record<ProjectCategory, string> = {
      web: 'language',
      mobile: 'phone_android',
      desktop: 'computer',
      backend: 'dns',
      frontend: 'web',
      other: 'more_horiz',
    };
    return icons[category];
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      completed: 'bg-accent text-white',
      'in-progress': 'bg-blue-500 text-white',
      planned: 'bg-yellow-500 text-white',
      paused: 'bg-gray-500 text-white',
    };
    return map[status] || 'bg-gray-500 text-white';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      completed: 'Concluído',
      'in-progress': 'Em Andamento',
      planned: 'Planejado',
      paused: 'Pausado',
    };
    return map[status] || status;
  }

  isProjectPreviewPlaying(projectId: string): boolean {
    return this.playingPreviewIds.has(projectId);
  }

  onProjectCardEnter(project: Project, video: HTMLVideoElement): void {
    if (!project.thumbVideo) return;
    const tryPlay = () => {
      this.playingPreviewIds.add(project.id);
      video.currentTime = 0;
      void video.play().catch(() => this.playingPreviewIds.delete(project.id));
    };
    if (video.readyState >= 3) {
      tryPlay();
    } else {
      const onReady = () => {
        tryPlay();
        video.removeEventListener('canplaythrough', onReady);
      };
      video.addEventListener('canplaythrough', onReady);
      video.load();
    }
  }

  onProjectCardLeave(project: Project, video: HTMLVideoElement): void {
    this.resetProjectPreview(project, video);
  }

  onProjectPreviewEnded(project: Project, video: HTMLVideoElement): void {
    this.resetProjectPreview(project, video);
  }

  private resetProjectPreview(project: Project, video: HTMLVideoElement): void {
    this.playingPreviewIds.delete(project.id);
    video.pause();
    video.currentTime = 0;
  }
}

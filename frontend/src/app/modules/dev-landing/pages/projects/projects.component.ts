import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { WhatsAppService } from '../../../shared/services/whatsapp-service.service';
import { gsap } from '../../../../core/gsap-register';
import { TranslateService } from '../../../../core/services/translate.service';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  year: string;
  liveUrl: string;
  technologies: string[];
  theme: {
    surface: string;
    accent: string;
    glow: string;
  };
  pages: string[]; // Array de screenshots — cada item é uma página do site
  video?: {
    src: string;
    poster?: string;
  };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SectionHeaderComponent, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('outerScroll', { static: true })
  outerScroll!: ElementRef<HTMLElement>;

  private platformId = inject(PLATFORM_ID);

  @ViewChildren('projectCard')
  projectCards!: QueryList<ElementRef<HTMLElement>>;

  @ViewChildren('innerScroll')
  innerScrolls!: QueryList<ElementRef<HTMLElement>>;

  @ViewChildren('projectVideo')
  projectVideos!: QueryList<ElementRef<HTMLVideoElement>>;

  // ── State ────────────────────────────────────────────────────────────────
  activeProjectIndex = 0;
  private ctx?: gsap.Context;
  private videoObserver?: IntersectionObserver;
  private whatsAppService = inject(WhatsAppService);
  readonly translate = inject(TranslateService);

  get projects(): ShowcaseProject[] {
    const t = (key: string) => this.translate.translate('devProjects.' + key);
    const result: ShowcaseProject[] = [
      {
        id: 'portfolio-pessoal',
        title: t('proj01Title'),
        description: t('proj01Desc'),
        year: '2025',
        liveUrl: 'https://maiawall.com',
        technologies: ['Angular', 'Tailwind CSS', 'RxJS', 'GSAP'],
        theme: {
          surface: '#0f172a',
          accent: '#38bdf8',
          glow: 'rgba(56, 189, 248, 0.45)',
        },
        pages: [
          'assets/images/projects/portfolio-pessoal/portfolio-pessoal-1.png',
          'assets/images/projects/portfolio-pessoal/portfolio-pessoal-2.png',
          'assets/images/projects/portfolio-pessoal/portfolio-pessoal-3.png',
        ],
        video: {
          src: 'assets/images/projects/portfolio-pessoal/portfolio-pessoal-video.mp4',
          poster: 'assets/images/projects/portfolio-pessoal/thumbnail.png',
        },
      },
      {
        id: 'banda-aurah',
        title: t('proj02Title'),
        description: t('proj02Desc'),
        year: '2026',
        liveUrl: 'https://portfolio-banda-aurah.vercel.app/',
        technologies: ['Angular', 'Tailwind CSS', 'Angular Material'],
        theme: {
          surface: '#111827',
          accent: '#f97316',
          glow: 'rgba(249, 115, 22, 0.35)',
        },
        pages: [
          'assets/images/projects/banda-aurah/banda-aurah1.png',
          'assets/images/projects/banda-aurah/banda-aurah2.png',
          'assets/images/projects/banda-aurah/banda-aurah3.png',
        ],
        video: {
          src: 'assets/images/projects/banda-aurah/banda-aurah_video.mp4',
        },
      },
      {
        id: 'instituto-motiro',
        title: t('proj03Title'),
        description: t('proj03Desc'),
        year: '2026',
        liveUrl: 'https://www.institutomotiro.com.br/',
        technologies: ['Vite', 'Tailwind CSS', 'TypeScript'],
        theme: {
          surface: '#0f2418',
          accent: '#34d399',
          glow: 'rgba(52, 211, 153, 0.35)',
        },
        pages: [
          'assets/images/projects/instituto-motiro/motiro1.png',
          'assets/images/projects/instituto-motiro/motiro2.png',
          'assets/images/projects/instituto-motiro/motiro3.png',
          'assets/images/projects/instituto-motiro/motiro4.png',
        ],
        video: {
          src: 'assets/images/projects/instituto-motiro/motiro_video.mp4',
        },
      },
      {
        id: 'painel-admin',
        title: t('proj04Title'),
        description: t('proj04Desc'),
        year: '2026',
        liveUrl:
          'https://www.linkedin.com/feed/update/urn:li:activity:7393610706035654656/',
        technologies: ['Angular', 'TypeScript', 'Angular Material'],
        theme: {
          surface: '#0b1220',
          accent: '#1e40af',
          glow: 'rgba(30, 64, 175, 0.35)',
        },
        pages: [
          'assets/images/projects/painel-admin/foto1.jpg',
          'assets/images/projects/painel-admin/foto2.jpg',
          'assets/images/projects/painel-admin/foto3.jpg',
          'assets/images/projects/painel-admin/foto4.jpg',
        ],
      },
      {
        id: 'schulles',
        title: t('proj05Title'),
        description: t('proj05Desc'),
        year: '2026',
        liveUrl: 'https://www.schulles.com.br/',
        technologies: ['Angular', 'TypeScript', 'Angular Material'],
        theme: {
          surface: '#0b1220',
          accent: '#1e40af',
          glow: 'rgba(30, 64, 175, 0.35)',
        },
        pages: [
          'assets/images/projects/schulles/hero.jpg',
          'assets/images/projects/schulles/mobile.jpg',
          'assets/images/projects/schulles/plans.jpg',
        ],
      },
      {
        id: 'portfolio-marcio-carvalho',
        title: t('proj06Title'),
        description: t('proj06Desc'),
        year: '2026',
        liveUrl: 'https://www.marciofcarvalho.com.br',
        technologies: [
          'Next.js',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'GSAP',
          'Zod',
          'Resend',
        ],
        theme: {
          surface: '#4A2E20',
          accent: '#C68A2E',
          glow: 'rgba(198, 138, 46, 0.35)',
        },
        pages: [
          'assets/images/projects/portfolio-marcio-carvalho/imagem-1.png',
          'assets/images/projects/portfolio-marcio-carvalho/imagem-2.png',
          'assets/images/projects/portfolio-marcio-carvalho/imagem-3.png',
        ],
      },
    ];
    return result;
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.ctx = gsap.context(() => {});
    setTimeout(() => this.setupVideoObserver(), 0);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    this.disconnectVideoObserver();
  }

  get activeProject(): ShowcaseProject {
    return this.projects[this.activeProjectIndex];
  }

  get activePageTotal(): number {
    return this.activeProject.pages.length + (this.activeProject.video ? 1 : 0);
  }

  get activePageIndicators(): number[] {
    return Array.from({ length: this.activePageTotal }, (_, index) => index);
  }

  selectProject(index: number): void {
    if (index === this.activeProjectIndex) return;

    this.pauseActiveVideo();
    this.disconnectVideoObserver();

    this.activeProjectIndex = index;
    this.cdr.markForCheck();

    // Rola o inner scroll de volta ao início ao trocar de projeto
    setTimeout(() => {
      const inner = this.innerScrolls.get(0);
      if (inner) {
        gsap.to(inner.nativeElement, {
          scrollTo: { x: 0 },
          duration: 0.4,
          ease: 'power2.out',
        });
      }
      this.setupVideoObserver();
    }, 50);
  }

  private setupVideoObserver(): void {
    this.disconnectVideoObserver();

    const video = this.projectVideos?.get(0)?.nativeElement;
    if (!video) return;

    this.videoObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          this.playVideoSafely(video);
        } else {
          video.pause();
        }
      },
      { root: null, threshold: 0.6 },
    );

    this.videoObserver.observe(video);
  }

  private disconnectVideoObserver(): void {
    this.videoObserver?.disconnect();
    this.videoObserver = undefined;
  }

  private pauseActiveVideo(): void {
    const video = this.projectVideos?.get(0)?.nativeElement;
    if (video && !video.paused) {
      video.pause();
    }
  }

  private playVideoSafely(video: HTMLVideoElement): void {
    const playResult = video.play();
    if (playResult && typeof playResult.catch === 'function') {
      playResult.catch(() => undefined);
    }
  }

  moreInfo(projectTitle: string): void {
    const link = this.whatsAppService.getItemOrderLink(projectTitle);
    window.open(link, '_blank');
  }
}

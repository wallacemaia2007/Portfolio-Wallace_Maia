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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShowcaseProject {
  id: string;
  title: string;
  shortDescription: string;
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

  readonly projects: ShowcaseProject[] = [
    {
      id: 'portfolio-pessoal',
      title: 'Portfolio Pessoal',
      shortDescription:
        'Meu portfolio principal, com foco em performance e narrativa visual.',
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
      title: 'Banda Aurah',
      shortDescription:
        'Identidade digital sonora com visual escuro e tipografia marcante.',
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
      title: 'Instituto Motiro',
      shortDescription:
        'Site institucional com foco em cultura, educação e comunidade.',
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
      id: 'traveler-website',
      title: 'Traveler Website',
      shortDescription:
        'Plataforma de viagens com cadastro de destinos e busca rápida.',
      year: '2025',
      liveUrl:
        'https://www.linkedin.com/feed/update/urn:li:activity:7393610706035654656/',
      technologies: ['Angular', 'TypeScript', 'Angular Material'],
      theme: {
        surface: '#1f2937',
        accent: '#a855f7',
        glow: 'rgba(168, 85, 247, 0.35)',
      },
      pages: [
        'assets/images/projects/traveler-website/traveler-website-1.png',
        'assets/images/projects/traveler-website/traveler-website-2.png',
        'assets/images/projects/traveler-website/traveler-website-3.png',
      ],
      video: {
        src: 'assets/images/projects/traveler-website/traveler-website-video.mp4',
        poster: 'assets/images/projects/traveler-website/thumbnail.jpg',
      },
    },
  ];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
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
}

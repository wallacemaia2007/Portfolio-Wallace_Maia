import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type LayerKey = 'background' | 'header' | 'hero' | 'content' | 'cta';

interface ShowcaseLayers {
  background: string;
  header: string;
  hero: string;
  content: string;
  cta: string;
}

interface LayerStage {
  key: LayerKey;
  label: string;
  start: number;
  end: number;
  depth: number;
  enterY: number;
  enterScale: number;
  enterBlur: number;
}

interface ShowcaseLayerView extends LayerStage {
  image: string;
  phase: number;
  zIndex: number;
  isActive: boolean;
}

interface ShowcaseProject {
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
  layers: ShowcaseLayers;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeaderComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projectsSection', { static: true }) projectsSection!: ElementRef<HTMLElement>;
  @ViewChild('projectsPin', { static: true }) projectsPin!: ElementRef<HTMLElement>;
  @ViewChild('mockupSurface', { static: true }) mockupSurface!: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;
  private scrollTrigger?: ScrollTrigger;
  private lastActiveIndex = 0;
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  activeProjectIndex = 0;
  activeSegmentProgress = 0;
  activeStageIndex = 0;

  readonly layerStages: LayerStage[] = [
    {
      key: 'background',
      label: 'Background',
      start: 0,
      end: 0.2,
      depth: 6,
      enterY: 0,
      enterScale: 1.08,
      enterBlur: 14,
    },
    {
      key: 'header',
      label: 'Header',
      start: 0.2,
      end: 0.4,
      depth: 12,
      enterY: -40,
      enterScale: 1.02,
      enterBlur: 8,
    },
    {
      key: 'hero',
      label: 'Hero',
      start: 0.4,
      end: 0.6,
      depth: 16,
      enterY: 40,
      enterScale: 1.04,
      enterBlur: 10,
    },
    {
      key: 'content',
      label: 'Content',
      start: 0.6,
      end: 0.85,
      depth: 22,
      enterY: 80,
      enterScale: 1.01,
      enterBlur: 6,
    },
    {
      key: 'cta',
      label: 'CTA',
      start: 0.85,
      end: 1,
      depth: 12,
      enterY: 30,
      enterScale: 1.02,
      enterBlur: 4,
    },
  ];

  readonly projects: ShowcaseProject[] = [
    {
      id: 'portfolio-pessoal',
      title: 'Portfolio Pessoal',
      shortDescription: 'Meu portfolio principal, com foco em performance e narrativa visual.',
      year: '2025',
      liveUrl: 'https://maiawall.com',
      technologies: ['Angular', 'Tailwind CSS', 'RxJS', 'GSAP'],
      theme: {
        surface: '#0f172a',
        accent: '#38bdf8',
        glow: 'rgba(56, 189, 248, 0.45)',
      },
      layers: this.buildLayers([
        'assets/images/projects/portfolio-pessoal/portfolio-pessoal-1.png',
        'assets/images/projects/portfolio-pessoal/portfolio-pessoal-2.png',
        'assets/images/projects/portfolio-pessoal/portfolio-pessoal-3.png',
      ]),
    },
    {
      id: 'banda-aurah',
      title: 'Banda Aurah',
      shortDescription: 'Identidade digital sonora com visual escuro e tipografia marcante.',
      year: '2026',
      liveUrl: 'https://portfolio-banda-aurah.vercel.app/',
      technologies: ['Angular', 'Tailwind CSS', 'Angular Material'],
      theme: {
        surface: '#111827',
        accent: '#f97316',
        glow: 'rgba(249, 115, 22, 0.35)',
      },
      layers: this.buildLayers([
        'assets/images/projects/banda-aurah/banda-aurah1.png',
        'assets/images/projects/banda-aurah/banda-aurah2.png',
        'assets/images/projects/banda-aurah/banda-aurah3.png',
      ]),
    },
    {
      id: 'instituto-motiro',
      title: 'Instituto Motiro',
      shortDescription: 'Site institucional com foco em cultura, educacao e comunidade.',
      year: '2026',
      liveUrl: 'https://www.institutomotiro.com.br/',
      technologies: ['Vite', 'Tailwind CSS', 'TypeScript'],
      theme: {
        surface: '#0f2418',
        accent: '#34d399',
        glow: 'rgba(52, 211, 153, 0.35)',
      },
      layers: this.buildLayers([
        'assets/images/projects/instituto-motiro/motiro1.png',
        'assets/images/projects/instituto-motiro/motiro2.png',
        'assets/images/projects/instituto-motiro/motiro3.png',
        'assets/images/projects/instituto-motiro/motiro4.png',
      ]),
    },
    {
      id: 'traveler-website',
      title: 'Traveler Website',
      shortDescription: 'Plataforma de viagens com cadastro de destinos e busca rapida.',
      year: '2025',
      liveUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7393610706035654656/',
      technologies: ['Angular', 'TypeScript', 'Angular Material'],
      theme: {
        surface: '#1f2937',
        accent: '#a855f7',
        glow: 'rgba(168, 85, 247, 0.35)',
      },
      layers: this.buildLayers([
        'assets/images/projects/traveler-website/traveler-website-1.png',
        'assets/images/projects/traveler-website/traveler-website-2.png',
        'assets/images/projects/traveler-website/traveler-website-3.png',
      ]),
    },
  ];

  get activeProject(): ShowcaseProject {
    return this.projects[this.activeProjectIndex];
  }

  get activeLayers(): ShowcaseLayerView[] {
    return this.layerStages.map((stage, index) => {
      const image = this.activeProject.layers[stage.key];
      const phase = this.phaseValue(this.activeSegmentProgress, stage.start, stage.end);

      return {
        ...stage,
        image,
        phase,
        zIndex: index + 1,
        isActive: this.activeStageIndex === index,
      };
    });
  }

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      this.scrollTrigger = ScrollTrigger.create({
        trigger: this.projectsPin.nativeElement,
        start: 'top top',
        end: () => `+=${window.innerHeight * this.projects.length}`,
        pin: this.projectsPin.nativeElement,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => this.handleScrollUpdate(self.progress),
        onRefresh: () => this.handleScrollUpdate(this.scrollTrigger?.progress ?? 0),
      });
    });

    if (this.prefersReducedMotion) {
      this.activeSegmentProgress = 1;
      this.activeStageIndex = this.layerStages.length - 1;
    }

    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.scrollTrigger?.kill();
    this.ctx?.revert();
  }

  scrollToProject(index: number): void {
    if (!this.scrollTrigger) {
      return;
    }

    const start = this.scrollTrigger.start;
    const end = this.scrollTrigger.end;
    const segmentSize = (end - start) / this.projects.length;
    const target = start + segmentSize * index;

    gsap.to(window, {
      scrollTo: target,
      duration: 0.9,
      ease: 'power3.out',
    });
  }

  phaseValue(progress: number, start: number, end: number): number {
    const clamped = gsap.utils.clamp(0, 1, (progress - start) / (end - start));
    return clamped;
  }

  private handleScrollUpdate(progress: number): void {
    const segmentSize = 1 / this.projects.length;
    const nextIndex = Math.min(this.projects.length - 1, Math.floor(progress / segmentSize));
    const segmentProgress = (progress - nextIndex * segmentSize) / segmentSize;

    this.activeProjectIndex = nextIndex;
    this.activeSegmentProgress = gsap.utils.clamp(0, 1, segmentProgress);
    this.activeStageIndex = this.getStageIndex(this.activeSegmentProgress);

    if (this.lastActiveIndex !== nextIndex) {
      this.lastActiveIndex = nextIndex;
      gsap.fromTo(
        this.mockupSurface.nativeElement,
        { opacity: 0.6, filter: 'blur(8px)', x: 24, scale: 1.02 },
        { opacity: 1, filter: 'blur(0px)', x: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
      );
    }
  }

  private getStageIndex(progress: number): number {
    const stage = this.layerStages.findIndex(
      (item) => progress >= item.start && progress < item.end
    );

    if (stage === -1) {
      return this.layerStages.length - 1;
    }

    return stage;
  }

  private buildLayers(images: string[]): ShowcaseLayers {
    const safe = (index: number) => images[index] ?? images[images.length - 1] ?? images[0] ?? '';

    return {
      background: safe(0),
      header: safe(1),
      hero: safe(2),
      content: safe(3),
      cta: safe(4),
    };
  }
}

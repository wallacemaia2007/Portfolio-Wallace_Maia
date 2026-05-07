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
      description:
        'Este projeto é o meu portfólio profissional, desenvolvido para apresentar minhas habilidades como desenvolvedor Full-Stack. Construído com Angular no frontend e Node.js no backend, ele simula um ambiente real com API, persistência de dados e integração de serviços. A interface foi pensada para oferecer boa experiência ao usuário, responsividade e performance, tanto em desktop quanto em dispositivos móveis. O projeto também demonstra conceitos modernos como componentização, consumo de API REST, gerenciamento de estado, rotas protegidas e arquitetura em camadas.',
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
      description:
        'Portfólio da banda Aurah, desenvolvido para apresentar seus projetos, habilidades e experiência profissional. Construído com Angular e Tailwind CSS, o site é responsivo e otimizado para SEO, o site conta com um sistema de agendamento integrado ao portfólio juntamente com a apresentação dos principais vídeos da banda e seu calendário com todas as datas de seus próximos shows.',
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
      description:
        'O Instituto Motirõ (Associação Promotora de Educação e Cultura - APEC) foi criado em 2023 a partir do desejo de construir um espaço físico de encontro para pessoas interessadas em educação e cultura em Passos (MG). Dedicado ao fomento e promoção da educação-cultura no município de Passos e região, o Motirõ é composto por dois núcleos: o Centro de Educação Interdisciplinar e Aprovações (CEIA) e o Núcleo de Arte e Cultura (NAC), fomentando desenvolvimento pessoal e comunitário. O Instituto Motirõ nasceu com o propósito de fortalecer a cultura, a educação e a coletividade. Cada projeto, cada ação e cada encontro são construídos de forma colaborativa, valorizando a partilha, a união e o poder do coletivo. O termo Motirõ (pronúncia: Motirô) origina-se no tupi-guarani e representa a reunião de pessoas para construir algo em comum, com ajuda mútua.',
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
      title: 'Painel Administrativo',
      description:
        'Você busca uma solução robusta para gerenciar seu negócio de eventos ou música? Eu ofereço o desenvolvimento de um ecossistema digital completo, focado em escalabilidade, organização e controle total sobre sua operação. Este projeto é ideal para agências, produtoras ou plataformas de agenciamento que precisam de uma interface intuitiva e painéis de dados precisos. O que está incluso no sistema Gestão de Usuários e Perfis: Controle de acessos multinível (Admin, Músicos, Clientes) com segurança de dados. Cadastro Estruturado: Módulo completo para cadastro de pacotes de serviços, catálogo de músicos e gerenciamento de base de clientes. Dashboard Dinâmico: Visualização de métricas em tempo real com gráficos interativos para tomada de decisão rápida. Controle Financeiro Integrado: Gestão de entradas, saídas, pagamentos de prestadores e histórico de transações. Interface Responsiva: Design moderno e funcional, adaptado para desktop e dispositivos móveis (conforme as imagens do portfólio).',
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
      title: 'Schulle Website',
      description:
        'Um restaurante focado em marmitas mensais investiu em uma plataforma digital completa para fortalecer sua marca e otimizar a operação. Desenvolvi um site profissional com foco em performance, conversão e experiência do usuário, com páginas institucionais, cardápio dinâmico, planos de marmita e integração com canais de contato. Também foi criado um sistema gerencial para centralizar clientes, cardápios, compras, gastos e métricas via Google Analytics. O projeto foi pensado para ser responsivo, rápido e escalável. Tecnologias utilizadas: Angular, Spring Boot, HTML, SCSS, TypeScript e Tailwind CSS.',
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

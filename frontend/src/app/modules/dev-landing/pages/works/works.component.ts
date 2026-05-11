import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WhatsAppService } from '../../../shared/services/whatsapp-service.service';

gsap.registerPlugin(ScrollTrigger);

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

  private ctx?: gsap.Context;
  private prefersReducedMotion = false;
  activeCategoryId: string | null = null;
  buildingHeights: Record<string, number> = {};

  private whatsAppService = inject(WhatsAppService);

  readonly categories: ServiceCategory[] = [
    {
      id: 'systems',
      name: 'Sistemas & SaaS',
      icon: 'domain',
      phrase:
        'Processos manuais travam crescimento. Desenvolvo sistemas robustos e plataformas SaaS sob medida que automatizam operações, centralizam informações e escalam junto com o negócio.',
      services: [
        'SaaS completo do zero ao deploy',
        'CRMs personalizados para empresas',
        'ERP e sistemas internos de gestão',
        'Painéis administrativos e dashboards',
        'Controle financeiro, estoque e relatórios',
        'Sistemas de autenticação e permissões',
        'Área do cliente e portais privados',
        'Sistemas acadêmicos e empresariais',
        'Integração entre setores e processos',
      ],
      stack: [
        'Java',
        'Spring Boot',
        'Angular',
        'MySQL',
        'REST API',
        'Docker',
        'JWT',
        'Hibernate',
      ],
      buildingType: 'skyscraper',
    },

    {
      id: 'webapps',
      name: 'Aplicações Web',
      icon: 'web',
      phrase:
        'Aplicações modernas, rápidas e altamente personalizadas para empresas, startups e operações digitais que precisam de performance e experiência premium.',
      services: [
        'Aplicações web B2B e B2C',
        'Dashboards em tempo real',
        'Sistemas responsivos e escaláveis',
        'Integração com APIs externas',
        'Autenticação, permissões e segurança',
        'Painéis administrativos completos',
        'Sistemas com upload de arquivos',
        'Aplicações com arquitetura moderna',
        'Interfaces interativas e fluidas',
      ],
      stack: [
        'Angular',
        'TypeScript',
        'RxJS',
        'Tailwind CSS',
        'SCSS',
        'Node.js',
        'Java',
      ],
      buildingType: 'commercial',
    },

    {
      id: 'ecommerce',
      name: 'E-commerce & Vendas',
      icon: 'storefront',
      phrase:
        'Lojas digitais criadas para vender mais, transmitir confiança e entregar uma experiência moderna do catálogo ao checkout.',
      services: [
        'Lojas virtuais personalizadas',
        'Catálogos digitais interativos',
        'Sistemas de pedidos online',
        'Integração com gateways de pagamento',
        'Checkout otimizado para conversão',
        'Plataformas de reservas e agendamentos',
        'Painel de gerenciamento de produtos',
        'Experiência mobile-first',
      ],
      stack: [
        'Angular',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Stripe',
        'REST API',
      ],
      buildingType: 'shop',
    },

    {
      id: 'sites',
      name: 'Sites & Landing Pages',
      icon: 'web_asset',
      phrase:
        'Seu site precisa impressionar nos primeiros segundos. Crio experiências modernas, rápidas e estratégicas que fortalecem sua marca e convertem visitantes em clientes.',
      services: [
        'Landing pages de alta conversão',
        'Sites institucionais modernos',
        'Sites empresariais completos',
        'Blogs e plataformas editoriais',
        'Sites com painel administrativo',
        'Sites otimizados para SEO',
        'Design responsivo e premium',
        'Animações e interações modernas',
        'Deploy profissional e domínio',
      ],
      stack: ['Angular', 'Tailwind CSS', 'GSAP', 'SEO', 'TypeScript', 'Vercel'],
      buildingType: 'agency',
    },

    {
      id: 'branding',
      name: 'Portfólios & Branding',
      icon: 'brush',
      phrase:
        'A presença digital certa faz você parecer maior, mais profissional e mais memorável. Construo identidades digitais que destacam pessoas e marcas.',
      services: [
        'Portfólios profissionais interativos',
        'Sites pessoais premium',
        'Link in bio personalizado',
        'Apresentações digitais para negócios',
        'UI/UX estratégico',
        'Design moderno com identidade forte',
        'Experiências visuais imersivas',
        'Posicionamento visual para freelancers',
      ],
      stack: ['Figma', 'Angular', 'Tailwind CSS', 'SCSS', 'GSAP'],
      buildingType: 'studio',
    },
    {
      id: 'automation',
      name: 'Automação & Integrações',
      icon: 'hub',
      phrase:
        'Automatizo tarefas repetitivas e conecto plataformas para transformar processos lentos em fluxos inteligentes e eficientes.',
      services: [
        'Integrações com APIs REST e GraphQL',
        'Automação de workflows',
        'Webhooks e eventos em tempo real',
        'Integração entre plataformas',
        'Sincronização e migração de dados',
        'Automação de atendimento e processos',
        'Conexão entre sistemas empresariais',
        'Integrações com ferramentas externas',
      ],
      stack: [
        'REST API',
        'GraphQL',
        'Webhooks',
        'OAuth',
        'Node.js',
        'Python',
        'n8n',
      ],
      buildingType: 'tower',
    },

    {
      id: 'maintenance',
      name: 'Manutenção & Evolução',
      icon: 'build',
      phrase:
        'Software parado envelhece rápido. Faço manutenção contínua, melhorias e evolução de sistemas para manter tudo seguro, moderno e eficiente.',
      services: [
        'Manutenção contínua de aplicações',
        'Correção de bugs e falhas',
        'Atualização de dependências',
        'Refatoração de código',
        'Modernização de sistemas legados',
        'Melhoria de arquitetura',
        'Deploy e monitoramento',
        'Versionamento e organização Git',
      ],
      stack: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Jest', 'Spring Boot'],
      buildingType: 'workshop',
    },

    {
      id: 'consulting',
      name: 'Consultoria & Estratégia',
      icon: 'lightbulb',
      phrase:
        'Nem todo problema precisa apenas de código. Ajudo empresas e profissionais a definirem a melhor estratégia digital para crescer online.',
      services: [
        'Consultoria para presença digital',
        'Planejamento de sistemas e aplicações',
        'Estratégia para produtos SaaS',
        'Estruturação de arquitetura web',
        'Análise técnica de projetos',
        'Mentoria para freelancers e devs',
        'Direcionamento tecnológico',
        'Escolha de stack e infraestrutura',
      ],
      stack: ['Arquitetura Web', 'UX/UI', 'SEO', 'Angular', 'Spring Boot'],
      buildingType: 'headquarters',
    },
  ];
  constructor() {
    // Calculate max height per category based on content volume
    this.categories.forEach((cat) => {
      const score =
        cat.services.length * 10 +
        cat.stack.length * 4 +
        cat.phrase.length * 0.12;
      const allScores = this.categories.map(
        (c) =>
          c.services.length * 10 + c.stack.length * 4 + c.phrase.length * 0.12,
      );
      const min = Math.min(...allScores);
      const max = Math.max(...allScores);
      cat.maxHeight = Math.round(45 + ((score - min) / (max - min)) * 50); // 45%–95%
    });

    this.randomizeHeights(null);
  }

  ngAfterViewInit(): void {
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

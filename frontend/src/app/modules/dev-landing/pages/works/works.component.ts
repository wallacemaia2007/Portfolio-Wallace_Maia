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
      phrase: 'Processo manual é dinheiro parado. Transformo fluxos complexos em plataformas digitais robustas, escaláveis e prontas para crescer com o seu negócio.',
      services: [
        'SaaS completo do zero ao deploy',
        'CRMs sob medida para sua operação',
        'Softwares de gestão interna',
        'Painéis administrativos e dashboards',
        'Sistemas de controle, relatórios e KPIs',
        'Área de cliente e portais de usuário',
      ],
      stack: ['Angular', 'Java', 'Spring Boot', 'MySQL', 'REST API', 'Docker'],
      buildingType: 'skyscraper',
    },
    {
      id: 'webapps',
      name: 'Aplicações Web',
      icon: 'web',
      phrase: 'Soluções web de alta performance construídas sob medida — sem templates, sem limitações, exatamente do jeito que o seu modelo de negócio exige.',
      services: [
        'Aplicações customizadas B2B e B2C',
        'Dashboards interativos em tempo real',
        'Integração com APIs e serviços externos',
        'Autenticação, permissões e controle de acesso',
      ],
      stack: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Node.js'],
      buildingType: 'commercial',
    },
    {
      id: 'ecommerce',
      name: 'E-commerce & Catálogos',
      icon: 'storefront',
      phrase: 'Venda mais com uma loja que realmente converte — do catálogo ao checkout, com a experiência que seus clientes merecem.',
      services: [
        'Lojas virtuais completas e personalizadas',
        'Catálogos digitais interativos',
        'Sistemas de agendamento e reservas online',
        'Integração com gateways de pagamento',
      ],
      stack: ['Angular', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
      buildingType: 'shop',
    },
    {
      id: 'sites',
      name: 'Sites & Landing Pages',
      icon: 'web_asset',
      phrase: 'Sua vitrine digital precisa impressionar em segundos. Crio sites e landing pages que carregam rápido, ranqueiam bem e transformam visitas em clientes.',
      services: [
        'Landing pages de alta conversão',
        'Sites institucionais modernos e responsivos',
        'Sites dinâmicos com painel de conteúdo',
        'Blogs e plataformas editoriais',
      ],
      stack: ['Angular', 'Tailwind CSS', 'GSAP', 'SEO'],
      buildingType: 'agency',
    },
    {
      id: 'branding',
      name: 'Portfólios & Branding',
      icon: 'brush',
      phrase: 'A primeira impressão é digital. Construo a presença online que faz sua marca — ou você mesmo — ser lembrado pelo motivo certo.',
      services: [
        'Portfólios profissionais interativos',
        'Sites pessoais e páginas de apresentação',
        'Link in bio com estilo e identidade própria',
        'Direção de UI/UX e identidade visual digital',
      ],
      stack: ['Figma', 'Angular', 'CSS/SCSS', 'Tailwind CSS'],
      buildingType: 'studio',
    },
    {
      id: 'performance',
      name: 'Automação & Performance',
      icon: 'speed',
      phrase: 'Cada segundo de carregamento perdido é receita que vai embora. Otimizo, automatizo e libero sua equipe para o que realmente importa.',
      services: [
        'Otimização de performance web (Core Web Vitals)',
        'SEO técnico e estrutural',
        'Automação de processos repetitivos via scripts',
        'Integração de webhooks e eventos em tempo real',
      ],
      stack: ['Lighthouse', 'Node.js', 'Python', 'Shell'],
      buildingType: 'factory',
    },
    {
      id: 'maintenance',
      name: 'Manutenção & Evolução',
      icon: 'build',
      phrase: 'Software que não evolui, envelhece. Mantenho seu sistema seguro, atualizado e sempre preparado para o próximo passo.',
      services: [
        'Manutenção contínua de sistemas web',
        'Modernização de aplicações legadas',
        'Refatoração e otimização de código',
        'Atualização de dependências e segurança',
      ],
      stack: ['Git', 'Docker', 'CI/CD', 'Jest'],
      buildingType: 'workshop',
    },
    {
      id: 'integrations',
      name: 'Integrações',
      icon: 'hub',
      phrase: 'Suas ferramentas não conversam entre si? Conecto sistemas, APIs e plataformas para que tudo funcione como um ecossistema único e automatizado.',
      services: [
        'Integração com APIs REST e GraphQL',
        'Automação de workflows (Zapier, Make, n8n)',
        'Sincronização e migração de dados',
      ],
      stack: ['RESTful APIs', 'GraphQL', 'Webhooks', 'OAuth'],
      buildingType: 'tower',
    },
  ];

  constructor() {
    // Calculate max height per category based on content volume
    this.categories.forEach(cat => {
      const score = cat.services.length * 10 + cat.stack.length * 4 + cat.phrase.length * 0.12;
      const allScores = this.categories.map(c =>
        c.services.length * 10 + c.stack.length * 4 + c.phrase.length * 0.12
      );
      const min = Math.min(...allScores);
      const max = Math.max(...allScores);
      cat.maxHeight = Math.round(45 + ((score - min) / (max - min)) * 50); // 45%–95%
    });

    this.randomizeHeights(null);
  }

  ngAfterViewInit(): void {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
          y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'expo.out',
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
    return this.categories.find(c => c.id === this.activeCategoryId);
  }

  getBuildingHeight(catId: string): string {
    return (this.buildingHeights[catId] ?? 45) + '%';
  }

  moreInfo(projectTitle: string): void {
    const link = this.whatsAppService.getWorkDetailsLink(projectTitle);
    window.open(link, '_blank');
  }
}
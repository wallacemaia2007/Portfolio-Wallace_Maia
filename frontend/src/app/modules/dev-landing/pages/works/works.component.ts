import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  phrase: string;
  services: string[];
  stack: string[];
  buildingType: string;
}

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective, SectionHeaderComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent implements AfterViewInit, OnDestroy {
  @ViewChild('worksSection', { static: true }) worksSection!: ElementRef;

  private ctx?: gsap.Context;
  private prefersReducedMotion = false;
  activeCategoryId: string | null = null;

  readonly categories: ServiceCategory[] = [
    {
      id: 'systems',
      name: 'Sistemas & SaaS',
      icon: 'domain',
      phrase: 'Transformo processos manuais em plataformas digitais escaláveis.',
      services: [
        'Desenvolvimento de SaaS do zero',
        'Criação de CRMs empresariais',
        'Softwares de gestão interna',
        'Sistemas de controle e relatórios',
        'Painéis administrativos completos',
        'Áreas de cliente e painéis de usuário'
      ],
      stack: ['Angular', 'Java', 'Spring Boot', 'MySQL', 'REST API', 'Docker'],
      buildingType: 'skyscraper'
    },
    {
      id: 'webapps',
      name: 'Aplicações Web',
      icon: 'web',
      phrase: 'Sistemas robustos e sob medida para o seu modelo de negócio.',
      services: [
        'Aplicações sob medida',
        'Dashboards administrativos',
        'Integração com APIs externas',
        'Sistemas B2B e B2C'
      ],
      stack: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Node.js'],
      buildingType: 'commercial'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce & Catálogos',
      icon: 'storefront',
      phrase: 'Lojas virtuais e catálogos para expandir suas vendas online.',
      services: [
        'E-commerces completos',
        'Catálogos digitais iterativos',
        'Sistemas de agendamento e reservas',
        'Integração com gateways de pagamento'
      ],
      stack: ['Angular', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
      buildingType: 'shop'
    },
    {
      id: 'sites',
      name: 'Sites & Landing Pages',
      icon: 'web_asset',
      phrase: 'Presença digital de alta performance para converter visitantes em clientes.',
      services: [
        'Landing pages otimizadas',
        'Sites institucionais modernos',
        'Sites dinâmicos',
        'Blogs e plataformas de conteúdo'
      ],
      stack: ['Angular', 'Tailwind CSS', 'GSAP', 'SEO'],
      buildingType: 'agency'
    },
    {
      id: 'branding',
      name: 'Portfólios & Branding',
      icon: 'brush',
      phrase: 'Sua marca pessoal ou empresarial destacada na internet.',
      services: [
        'Criação de portfólios profissionais',
        'Sites pessoais',
        'Páginas de apresentação (Link in bio)',
        'Design UI/UX'
      ],
      stack: ['Figma', 'Angular', 'CSS/SCSS', 'Tailwind CSS'],
      buildingType: 'studio'
    },
    {
      id: 'performance',
      name: 'Automação & Performance',
      icon: 'speed',
      phrase: 'Acelere seu site e automatize rotinas maçantes.',
      services: [
        'Automação de processos via scripts',
        'Otimização de performance web',
        'SEO técnico e estrutural',
        'Integração de webhooks'
      ],
      stack: ['Lighthouse', 'Node.js', 'Python', 'Shell'],
      buildingType: 'factory'
    },
    {
      id: 'maintenance',
      name: 'Manutenção & Evolução',
      icon: 'build',
      phrase: 'Mantenha seu sistema seguro, atualizado e pronto para crescer.',
      services: [
        'Manutenção de sistemas web',
        'Modernização de aplicações legadas',
        'Refatoração de código',
        'Atualização de dependências'
      ],
      stack: ['Git', 'Docker', 'CI/CD', 'Jest'],
      buildingType: 'workshop'
    },
    {
      id: 'integrations',
      name: 'Integrações',
      icon: 'hub',
      phrase: 'Conectando as ferramentas que você já usa em um ecossistema único.',
      services: [
        'Integração com APIs e serviços externos',
        'Automação de workflows (Zapier, Make)',
        'Sincronização de dados'
      ],
      stack: ['RESTful APIs', 'GraphQL', 'Webhooks', 'OAuth'],
      buildingType: 'tower'
    }
  ];

  ngAfterViewInit(): void {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) return;

    setTimeout(() => {
      this.initAnimations();
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }

  private initAnimations(): void {
    if (!this.worksSection) return;

    this.ctx = gsap.context(() => {
      gsap.fromTo('.building', 
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
            toggleActions: 'play none none none'
          }
        }
      );
    }, this.worksSection.nativeElement);
  }

  selectCategory(id: string): void {
    this.activeCategoryId = this.activeCategoryId === id ? null : id;
  }

  get activeCategory(): ServiceCategory | undefined {
    return this.categories.find(c => c.id === this.activeCategoryId);
  }
}

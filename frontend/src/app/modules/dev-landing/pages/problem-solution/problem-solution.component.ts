import {
  Component,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ComparisonItem {
  text: string;
}

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-problem-solution',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './problem-solution.component.html',
  styleUrl: './problem-solution.component.scss',
})
export class ProblemSolutionComponent implements AfterViewInit, OnDestroy {
  readonly currentSiteItems: ComparisonItem[] = [
    { text: 'Visual desatualizado e genérico' },
    { text: 'Mensagem confusa, visitante não entende o valor' },
    { text: 'Pouca conversão e oportunidades perdidas' },
    { text: 'Não transmite confiança ou profissionalismo' },
    { text: 'Site que só ocupa espaço, não gera retorno' },
  ];

  readonly deliveredItems: ComparisonItem[] = [
    { text: 'Design moderno e alinhado à sua marca' },
    { text: 'Mensagem clara que conecta e convence' },
    { text: 'Estratégia focada em conversão e resultados' },
    { text: 'Transmite confiança e autoridade' },
    { text: 'Um site que trabalha por você 24h por dia' },
  ];

  readonly services: ServiceItem[] = [
    {
      icon: 'store',
      title: 'ERP',
      description: 'Gestao completa do negocio',
    },
    {
      icon: 'support_agent',
      title: 'CRM',
      description: 'Relacionamento e vendas',
    },
    {
      icon: 'cloud',
      title: 'SAAS',
      description: 'Produto escalavel na nuvem',
    },
    {
      icon: 'public',
      title: 'PORTFOLIOS',
      description: 'Autoridade e conversao',
    },
    {
      icon: 'campaign',
      title: 'LANDING PAGES',
      description: 'Captacao e vendas',
    },
    {
      icon: 'dashboard',
      title: 'PAINEIS ADM',
      description: 'Controle em tempo real',
    },
    {
      icon: 'shopping_cart',
      title: 'E-COMMERCE',
      description: 'Loja pronta para vender',
    },
    {
      icon: 'insights',
      title: 'DASHBOARDS',
      description: 'Indicadores claros',
    },
    {
      icon: 'support',
      title: 'SUPORTE',
      description: 'Evolucao continua',
    },
    {
      icon: 'integration_instructions',
      title: 'INTEGRACOES',
      description: 'APIs e automacoes',
    },
  ];

  private ctx?: gsap.Context;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {
      // 1. Revelação Inicial do Header
      gsap.from('.text-center > *', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.text-center',
          start: 'top 85%',
        },
      });

      // 2. Animação dos Cards (Entrada Lateral)
      gsap.from('.problem-card', {
        x: -100,
        opacity: 0,
        duration: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.grid',
          start: 'top 75%',
        },
      });

      gsap.from('.solution-card', {
        x: 100,
        opacity: 0,
        duration: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.grid',
          start: 'top 75%',
        },
      });

      // 3. Animação do Divider Central
      gsap.from('.lg\\:flex', {
        scale: 0,
        rotate: -180,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.grid',
          start: 'top 75%',
        },
      });

      // 4. Animação da Barra de Resultados (Footer)
      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.results-footer-v2',
          start: 'top 90%',
        },
      });

      footerTl
        .from('.results-footer-v2', {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
        .from(
          '.stat-item',
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.5',
        );

      // 5. Efeito de Pulso Sutil no Mockup da Solução
      gsap.to('.solution-card .browser-mockup', {
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut',
      });
    }, this.el.nativeElement);
  }
}

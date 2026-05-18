import {
  Component,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from '../../../../core/gsap-register';
import { TranslateService } from '../../../../core/services/translate.service';

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
  readonly translate = inject(TranslateService);

  get currentSiteItems(): ComparisonItem[] {
    return [
      { text: this.translate.translate('devProblemSolution.current01') },
      { text: this.translate.translate('devProblemSolution.current02') },
      { text: this.translate.translate('devProblemSolution.current03') },
      { text: this.translate.translate('devProblemSolution.current04') },
      { text: this.translate.translate('devProblemSolution.current05') },
    ];
  }

  get deliveredItems(): ComparisonItem[] {
    return [
      { text: this.translate.translate('devProblemSolution.delivered01') },
      { text: this.translate.translate('devProblemSolution.delivered02') },
      { text: this.translate.translate('devProblemSolution.delivered03') },
      { text: this.translate.translate('devProblemSolution.delivered04') },
      { text: this.translate.translate('devProblemSolution.delivered05') },
    ];
  }

  get services(): ServiceItem[] {
    return [
      { icon: 'store', title: 'ERP', description: this.translate.translate('devProblemSolution.service01') },
      { icon: 'support_agent', title: 'CRM', description: this.translate.translate('devProblemSolution.service02') },
      { icon: 'cloud', title: 'SAAS', description: this.translate.translate('devProblemSolution.service03') },
      { icon: 'public', title: 'PORTFOLIOS', description: this.translate.translate('devProblemSolution.service04') },
      { icon: 'campaign', title: 'LANDING PAGES', description: this.translate.translate('devProblemSolution.service05') },
      { icon: 'dashboard', title: 'PAINEIS ADM', description: this.translate.translate('devProblemSolution.service06') },
      { icon: 'shopping_cart', title: 'E-COMMERCE', description: this.translate.translate('devProblemSolution.service07') },
      { icon: 'insights', title: 'DASHBOARDS', description: this.translate.translate('devProblemSolution.service08') },
      { icon: 'support', title: 'SUPORTE', description: this.translate.translate('devProblemSolution.service09') },
      { icon: 'integration_instructions', title: 'INTEGRACOES', description: this.translate.translate('devProblemSolution.service10') },
    ];
  }

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

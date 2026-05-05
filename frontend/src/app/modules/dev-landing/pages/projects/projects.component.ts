import {
  Component,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  technologies: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  startDate: string;
  status: string;
  clientType: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ScrollRevealDirective,
    SectionHeaderComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnDestroy, AfterViewInit {
  @ViewChild('projectsGrid') projectsGrid!: ElementRef;

  private ctx?: gsap.Context;
  private prefersReducedMotion = false;

  readonly fallbackThumbnail = 'assets/images/placeholder-project.png';

  readonly projects: ProjectData[] = [
    {
      id: '5',
      title: 'Instituto Motiro',
      shortDescription: 'Instituto cultural e educacional focado em desenvolvimento comunitario',
      thumbnail: 'assets/images/projects/instituto-motiro/motiro1.png',
      technologies: ['Vite', 'Tailwind CSS', 'TypeScript', 'RxJS', 'UUID', 'LocalStorage'],
      featured: true,
      liveUrl: 'https://www.institutomotiro.com.br/',
      startDate: '2026-03-25',
      status: 'completed',
      clientType: 'freelance',
    },
    {
      id: '6',
      title: 'Portfolio Banda Aurah',
      shortDescription: 'Portfolio da banda Aurah responsivo com Angular e Tailwind CSS',
      thumbnail: 'assets/images/projects/banda-aurah/banda-aurah1.png',
      technologies: ['Angular', 'Tailwind CSS', 'Angular Material', 'RxJS', 'Express', 'Node.js'],
      featured: true,
      liveUrl: 'https://portfolio-banda-aurah.vercel.app/',
      startDate: '2026-01-20',
      status: 'completed',
      clientType: 'freelance',
    },
    {
      id: '3',
      title: 'Portfolio Pessoal',
      shortDescription: 'Portfolio pessoal responsivo com Angular e Tailwind CSS',
      thumbnail: 'assets/images/projects/portfolio-pessoal/thumbnail.png',
      technologies: ['Angular', 'Tailwind CSS', 'Angular Material', 'RxJS', 'Express', 'Node.js'],
      featured: true,
      githubUrl: 'https://github.com/wallacemaia2007/Portfolio-Wallace_Maia',
      liveUrl: 'https://maiawall.com',
      startDate: '2025-12-20',
      status: 'completed',
      clientType: 'freelance',
    },
    {
      id: '2',
      title: 'Traveler Website',
      shortDescription: 'Sistema web para gerenciar lugares favoritos de viagem',
      thumbnail: 'assets/images/projects/traveler-website/thumbnail.jpg',
      technologies: ['Angular', 'Angular Material', 'TypeScript', 'RxJS', 'OAuth', 'ViaCep API', 'Tailwind CSS'],
      featured: false,
      githubUrl: 'https://github.com/wallacemaia2007/traveler-website',
      liveUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7393610706035654656/',
      startDate: '2025-10-20',
      status: 'completed',
      clientType: 'pessoal',
    },
    {
      id: '4',
      title: 'Customer Register',
      shortDescription: 'Sistema web para cadastrar e gerenciar clientes',
      thumbnail: 'assets/images/projects/customer-register/thumbnail.png',
      technologies: ['Angular', 'Angular Material', 'TypeScript', 'BrasilAPI', 'RxJS', 'UUID', 'LocalStorage'],
      featured: false,
      githubUrl: 'https://github.com/wallacemaia2007/Customer-register',
      liveUrl: 'https://www.linkedin.com/posts/wallacemaia-dev_javascript-typescript-angular-activity-7385676116797079552-S7PG',
      startDate: '2025-10-07',
      status: 'completed',
      clientType: 'pessoal',
    },
    {
      id: '1',
      title: 'Digital Bank Api',
      shortDescription: 'API REST de banco digital em Java com Spring Boot',
      thumbnail: 'assets/images/projects/digital-bank/thumbnail.jpeg',
      technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'Spring Security', 'MySQL', 'REST API', 'Maven', 'JUnit', 'Postman', 'Git', 'Docker', 'Mockito', 'Swagger'],
      featured: false,
      githubUrl: 'https://github.com/wallacemaia2007/Digital-bank-api',
      liveUrl: 'https://www.linkedin.com/posts/wallacemaia-dev_java-springboot-springsecurity-activity-7376984431712083968-Hbt_',
      startDate: '2025-08-13',
      status: 'completed',
      clientType: 'pessoal',
    },
  ];

  readonly statusNames: Record<string, string> = {
    completed: 'Concluido',
    'in-progress': 'Em Andamento',
    planned: 'Planejado',
    paused: 'Pausado',
  };

  readonly clientTypeNames: Record<string, string> = {
    freelance: 'Freelance',
    empresa: 'Empresa',
    pessoal: 'Pessoal',
    'open-source': 'Open Source',
  };

  ngAfterViewInit(): void {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!this.prefersReducedMotion) {
      setTimeout(() => this.initAnimations(), 300);
    }
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }

  private initAnimations(): void {
    if (!this.projectsGrid) return;

    this.ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 40,
        scale: 0.96,
        stagger: 0.08,
        duration: 0.6,
        ease: 'expo.out',
        clearProps: 'opacity,transform',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          once: true,
        },
      });
    }, this.projectsGrid.nativeElement);
  }

  getVisibleTechnologies(techs: string[]): string[] {
    return techs.slice(0, 4);
  }

  getRemainingTechCount(techs: string[]): number {
    return techs.length > 4 ? techs.length - 4 : 0;
  }

  getStatusLabel(status: string): string {
    return this.statusNames[status] || status;
  }

  getClientTypeLabel(clientType: string): string {
    return this.clientTypeNames[clientType] || clientType;
  }

  getStatusColor(status: string): string {
    return status === 'completed'
      ? 'bg-accent/15 text-accent dark:text-accent-light'
      : 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400';
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.fallbackThumbnail;
  }
}

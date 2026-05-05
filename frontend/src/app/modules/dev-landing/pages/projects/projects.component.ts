import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { Project } from '../../../portfolio/models/project.model';
import { ProjectCardComponent } from '../../../portfolio/pages/projects/components/project-card/project-card.component';
import { ProjectModalComponent } from '../../../portfolio/pages/projects/components/project-modal/project-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ScrollRevealDirective,
    SectionHeaderComponent,
    ProjectCardComponent,
    ProjectModalComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private playingPreviewIds = new Set<string>();

  selectedProject: Project | null = null;

  readonly projects: Project[] = [
    {
      id: '5',
      title: 'Instituto Motiro',
      slug: 'instituto-motiro',
      description:
        'Site institucional para o Instituto Motiro, com foco em cultura, educacao e desenvolvimento comunitario.',
      shortDescription: 'Instituto cultural e educacional focado em desenvolvimento comunitario',
      thumbnail: 'assets/images/projects/instituto-motiro/motiro1.png',
      images: [
        'assets/images/projects/instituto-motiro/motiro1.png',
        'assets/images/projects/instituto-motiro/motiro2.png',
        'assets/images/projects/instituto-motiro/motiro3.png',
        'assets/images/projects/instituto-motiro/motiro4.png',
      ],
      thumbVideo: 'assets/images/projects/instituto-motiro/motiro_video.mp4',
      technologies: ['Vite', 'Tailwind CSS', 'TypeScript', 'RxJS', 'UUID', 'LocalStorage'],
      category: 'web',
      featured: true,
      liveUrl: 'https://www.institutomotiro.com.br/',
      startDate: '2026-03-25',
      status: 'completed',
      tags: ['institucional', 'comunidade', 'web'],
      clientType: 'freelance',
    },
    {
      id: '6',
      title: 'Portfolio Banda Aurah',
      slug: 'portfolio-banda-aurah',
      description:
        'Portfolio da banda Aurah com layout responsivo e identidade visual personalizada.',
      shortDescription: 'Portfolio da banda Aurah responsivo com Angular e Tailwind CSS',
      thumbnail: 'assets/images/projects/banda-aurah/banda-aurah1.png',
      images: [
        'assets/images/projects/banda-aurah/banda-aurah1.png',
        'assets/images/projects/banda-aurah/banda-aurah2.png',
        'assets/images/projects/banda-aurah/banda-aurah3.png',
      ],
      thumbVideo: 'assets/images/projects/banda-aurah/banda-aurah_video.mp4',
      technologies: ['Angular', 'Tailwind CSS', 'Angular Material', 'RxJS', 'Express', 'Node.js'],
      category: 'web',
      featured: true,
      liveUrl: 'https://portfolio-banda-aurah.vercel.app/',
      startDate: '2026-01-20',
      status: 'completed',
      tags: ['musica', 'portfolio', 'web'],
      clientType: 'freelance',
    },
    {
      id: '3',
      title: 'Portfolio Pessoal',
      slug: 'portfolio-pessoal',
      description:
        'Portfolio pessoal com foco em performance, layout responsivo e organizacao de projetos.',
      shortDescription: 'Portfolio pessoal responsivo com Angular e Tailwind CSS',
      thumbnail: 'assets/images/projects/portfolio-pessoal/thumbnail.png',
      images: [
        'assets/images/projects/portfolio-pessoal/portfolio-pessoal-1.png',
        'assets/images/projects/portfolio-pessoal/portfolio-pessoal-2.png',
        'assets/images/projects/portfolio-pessoal/portfolio-pessoal-3.png',
      ],
      thumbVideo: 'assets/images/projects/portfolio-pessoal/portfolio-pessoal-video.mp4',
      technologies: ['Angular', 'Tailwind CSS', 'Angular Material', 'RxJS', 'Express', 'Node.js'],
      category: 'web',
      featured: true,
      githubUrl: 'https://github.com/wallacemaia2007/Portfolio-Wallace_Maia',
      liveUrl: 'https://maiawall.com',
      startDate: '2025-12-20',
      status: 'completed',
      tags: ['portfolio', 'angular', 'web'],
      clientType: 'freelance',
    },
    {
      id: '2',
      title: 'Traveler Website',
      slug: 'traveler-website',
      description:
        'Aplicacao web para organizar lugares favoritos, com busca e cadastro de destinos.',
      shortDescription: 'Sistema web para gerenciar lugares favoritos de viagem',
      thumbnail: 'assets/images/projects/traveler-website/thumbnail.jpg',
      images: [
        'assets/images/projects/traveler-website/traveler-website-1.png',
        'assets/images/projects/traveler-website/traveler-website-2.png',
        'assets/images/projects/traveler-website/traveler-website-3.png',
      ],
      thumbVideo: 'assets/images/projects/traveler-website/traveler-website-video.mp4',
      technologies: ['Angular', 'Angular Material', 'TypeScript', 'RxJS', 'OAuth', 'ViaCep API', 'Tailwind CSS'],
      category: 'web',
      featured: false,
      githubUrl: 'https://github.com/wallacemaia2007/traveler-website',
      liveUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7393610706035654656/',
      startDate: '2025-10-20',
      status: 'completed',
      tags: ['viagens', 'web', 'angular'],
      clientType: 'pessoal',
    },
    {
      id: '4',
      title: 'Customer Register',
      slug: 'customer-register',
      description:
        'Sistema web para cadastro e gerenciamento de clientes com integracao de API.',
      shortDescription: 'Sistema web para cadastrar e gerenciar clientes',
      thumbnail: 'assets/images/projects/customer-register/thumbnail.png',
      images: [
        'assets/images/projects/customer-register/customer-register-1.png',
        'assets/images/projects/customer-register/customer-register-2.png',
        'assets/images/projects/customer-register/customer-register-3.png',
      ],
      thumbVideo: '',
      technologies: ['Angular', 'Angular Material', 'TypeScript', 'BrasilAPI', 'RxJS', 'UUID', 'LocalStorage'],
      category: 'web',
      featured: false,
      githubUrl: 'https://github.com/wallacemaia2007/Customer-register',
      liveUrl: 'https://www.linkedin.com/posts/wallacemaia-dev_javascript-typescript-angular-activity-7385676116797079552-S7PG',
      startDate: '2025-10-07',
      status: 'completed',
      tags: ['clientes', 'web', 'angular'],
      clientType: 'pessoal',
    },
    {
      id: '1',
      title: 'Digital Bank Api',
      slug: 'digital-bank-api',
      description:
        'API REST de banco digital em Java com Spring Boot, focada em seguranca e integracoes.',
      shortDescription: 'API REST de banco digital em Java com Spring Boot',
      thumbnail: 'assets/images/projects/digital-bank/thumbnail.jpeg',
      images: [
        'assets/images/projects/digital-bank/digital-bank-1.png',
        'assets/images/projects/digital-bank/digital-bank-2.png',
        'assets/images/projects/digital-bank/digital-bank-3.png',
      ],
      thumbVideo: 'assets/images/projects/digital-bank/digital-bank-video.mp4',
      technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'Spring Security', 'MySQL', 'REST API', 'Maven', 'JUnit', 'Postman', 'Git', 'Docker', 'Mockito', 'Swagger'],
      category: 'backend',
      featured: false,
      githubUrl: 'https://github.com/wallacemaia2007/Digital-bank-api',
      liveUrl: 'https://www.linkedin.com/posts/wallacemaia-dev_java-springboot-springsecurity-activity-7376984431712083968-Hbt_',
      startDate: '2025-08-13',
      status: 'completed',
      tags: ['api', 'java', 'backend'],
      clientType: 'pessoal',
    },
  ];

  openProjectModal(project: Project): void {
    this.selectedProject = project;
  }

  closeProjectModal(): void {
    this.selectedProject = null;
  }

  isProjectPreviewPlaying(projectId: string): boolean {
    return this.playingPreviewIds.has(projectId);
  }

  onProjectCardEnter(project: Project, video: HTMLVideoElement): void {
    if (!project.thumbVideo) {
      return;
    }

    this.playingPreviewIds.add(project.id);
    video.currentTime = 0;
    void video.play().catch(() => {
      this.playingPreviewIds.delete(project.id);
    });
  }

  onProjectCardLeave(project: Project, video: HTMLVideoElement): void {
    this.resetProjectPreview(project, video);
  }

  onProjectPreviewEnded(project: Project, video: HTMLVideoElement): void {
    this.resetProjectPreview(project, video);
  }

  private resetProjectPreview(project: Project, video: HTMLVideoElement): void {
    this.playingPreviewIds.delete(project.id);
    video.pause();
    video.currentTime = 0;
  }
}

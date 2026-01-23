import { Component, inject, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { PortfolioService } from '../../services/portfolio.service';
import { AboutInfo, JourneyItem, Education, Value, Hobby } from '../../models/about.model';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { InformationBarComponent, InformationBarData } from '../../../shared/components/information-bar/information-bar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule,
    ScrollRevealDirective,
    SectionHeaderComponent,
    InformationBarComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);

  aboutInfo!: AboutInfo;
  isLoading = true;

  journeyItems: JourneyItem[] = [];
  educationList: Education[] = [];
  values: Value[] = [];
  hobbies: Hobby[] = [];

  ctaData: InformationBarData = {
    title: 'Vamos Trabalhar Juntos?',
    description:
      'Se você se identificou com minha história e quer trabalhar em um projeto incrível, estou aqui para ajudar!',
    buttons: [
      {
        text: 'Me Envie uma Mensagem',
        icon: 'email',
        color: true,
        link: '/contact',
      },
      {
        text: 'Ver Meus Projetos',
        icon: 'work',
        color: false,
        link: '/projects',
      },
    ],
  };

  private intersectionObserver?: IntersectionObserver;

  ngOnInit(): void {
    this.loadAboutInfo();
  }

  ngAfterViewInit(): void {
    this.setupScrollRevealAnimations();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private loadAboutInfo(): void {
    this.isLoading = true;
    this.portfolioService.getAboutInfo().subscribe({
      next: (data) => {
        this.aboutInfo = data;
        this.journeyItems = data.journeyItems || [];
        this.educationList = data.educationList || [];
        this.values = data.values || [];
        this.hobbies = data.hobbies || [];
        this.isLoading = false;

        setTimeout(() => this.setupScrollRevealAnimations(), 100);
      },
      error: (err) => {
        console.error('Erro ao carregar informações do About:', err);
        this.isLoading = false;
      }
    });
  }

  private setupScrollRevealAnimations(): void {
    const sections = document.querySelectorAll('section[appScrollReveal]');
    
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.3,
      rootMargin: '0px',
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        const section = entry.target as HTMLElement;
        
        if (entry.isIntersecting) {
          section.classList.add('in-view');
          section.classList.remove('scroll-exit');
          
          if (index % 2 === 0) {
            section.classList.add('from-left');
            section.classList.remove('from-right');
          } else {
            section.classList.add('from-right');
            section.classList.remove('from-left');
          }
        } else {
          section.classList.remove('in-view');
          section.classList.add('scroll-exit');
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      this.intersectionObserver?.observe(section);
    });
  }

  getJourneyIcon(type: string): string {
    const iconMap: Record<string, string> = {
      education: 'school',
      achievement: 'star',
      learning: 'lightbulb',
      milestone: 'flag',
    };
    return iconMap[type] || 'timeline';
  }

  isCurrentEducation(education: Education): boolean {
    return education.current === true;
  }
}


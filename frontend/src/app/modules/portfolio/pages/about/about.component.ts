import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { PortfolioService } from '../../services/portfolio.service';
import {
  AboutInfo,
  JourneyItem,
  Education,
  Value,
  Hobby,
} from '../../models/about.model';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import {
  InformationBarComponent,
  InformationBarData,
} from '../../../shared/components/information-bar/information-bar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    ScrollRevealDirective,
    SectionHeaderComponent,
    InformationBarComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
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
        label: 'Me Envie uma Mensagem',
        icon: 'email',
        color: 'theme',
        link: '/contact',
      },
      {
        label: 'Ver Meus Projetos',
        icon: 'work',
        color: 'theme',
        link: '/projects',
      },
    ],
  };

  private intersectionObserver?: IntersectionObserver;

  ngOnInit(): void {
    this.loadAboutInfo();
    this.loadEducation();
    this.loadJourney();
    this.loadValues();
    this.loadHobbies();
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
        this.isLoading = false;

        setTimeout(() => this.setupScrollRevealAnimations(), 100);
      },
      error: (err) => {
        console.error('Erro ao carregar informações do About:', err);
        this.isLoading = false;
      },
    });
  }
  private loadEducation(): void {
    this.isLoading = true;
    this.portfolioService.getEducation().subscribe({
      next: (data) => {
        this.educationList = data;
        this.isLoading = false;

        setTimeout(() => this.setupScrollRevealAnimations(), 100);
      },
      error: (err) => {
        console.error('Erro ao carregar informações da Educação:', err);
        this.isLoading = false;
      },
    });
  }
  private loadJourney(): void {
    this.isLoading = true;
    this.portfolioService.getJourneyItems().subscribe({
      next: (data) => {
        this.journeyItems = data;
        this.isLoading = false;

        setTimeout(() => this.setupScrollRevealAnimations(), 100);
      },
      error: (err) => {
        console.error('Erro ao carregar informações da Jornada:', err);
        this.isLoading = false;
      },
    });
  }
  private loadValues(): void {
    this.isLoading = true;
    this.portfolioService.getValues().subscribe({
      next: (data) => {
        this.values = data;
        this.isLoading = false;

        setTimeout(() => this.setupScrollRevealAnimations(), 100);
      },
      error: (err) => {
        console.error('Erro ao carregar informações dos Valores:', err);
        this.isLoading = false;
      },
    });
  }
  private loadHobbies(): void {
    this.isLoading = true;
    this.portfolioService.getHobbies().subscribe({
      next: (data) => {
        this.hobbies = data;
        this.isLoading = false;

        setTimeout(() => this.setupScrollRevealAnimations(), 100);
      },
      error: (err) => {
        console.error('Erro ao carregar informações dos Hobbies:', err);
        this.isLoading = false;
      },
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

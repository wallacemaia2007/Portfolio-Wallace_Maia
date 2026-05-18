import {
  Component,
  inject,
  OnInit,
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
import { TranslateService } from '../../../../core/services/translate.service';
import { LangTextPipe } from '../../../shared/pipes/lang-text.pipe';
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
    LangTextPipe,
    ScrollRevealDirective,
    SectionHeaderComponent,
    InformationBarComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  protected translate = inject(TranslateService);

  aboutInfo!: AboutInfo;
  isLoading = true;

  journeyItems: JourneyItem[] = [];
  educationList: Education[] = [];
  values: Value[] = [];
  hobbies: Hobby[] = [];

  get ctaData(): InformationBarData {
    const t = (key: string) => this.translate.translate(key);
    return {
      title: t('about.ctaTitle'),
      description: t('about.ctaDescription'),
      buttons: [
        {
          label: t('about.ctaButton'),
          icon: 'email',
          color: 'theme',
          link: '/contact',
        },
        {
          label: t('about.ctaProjectsButton'),
          icon: 'work',
          color: 'primary',
          link: '/projects',
        },
      ],
    };
  }

  ngOnInit(): void {
    this.loadAboutInfo();
    this.loadEducation();
    this.loadJourney();
    this.loadValues();
    this.loadHobbies();
  }

  private loadAboutInfo(): void {
    this.isLoading = true;
    this.portfolioService.getAboutInfo().subscribe({
      next: (data) => {
        this.aboutInfo = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading about info:', err);
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
      },
      error: (err) => {
        console.error('Error loading education:', err);
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
      },
      error: (err) => {
        console.error('Error loading journey:', err);
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
      },
      error: (err) => {
        console.error('Error loading values:', err);
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
      },
      error: (err) => {
        console.error('Error loading hobbies:', err);
        this.isLoading = false;
      },
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
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PortfolioService } from '../../services/portfolio.service';
import {
  Experience,
  ExperienceType,
  EXPERIENCE_TYPE_NAMES,
} from '../../models/experience.model';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { ExperienceCardComponent } from './components/experience-card/experience-card.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

interface ExperienceTypeInfo {
  value: ExperienceType | 'all';
  label: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    ScrollRevealDirective,
    ExperienceCardComponent,
    SectionHeaderComponent,
    RouterLink,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  isLoading = true;
  experiences: Experience[] = [];
  selectedType: ExperienceType | 'all' = 'all';
  experienceTypes: ExperienceTypeInfo[] = [];

  ngOnInit(): void {
    this.loadExperiences();
  }

  private loadExperiences(): void {
    this.isLoading = true;

    this.portfolioService.getExperience().subscribe({
      next: (experiences) => {
        this.experiences = experiences;

        this.buildExperienceTypes();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar experiências:', error);
        this.isLoading = false;
      },
    });
  }

  private buildExperienceTypes(): void {
    const typeCounts = new Map<ExperienceType, number>();

    this.experiences.forEach((experience) => {
      const count = typeCounts.get(experience.type) || 0;
      typeCounts.set(experience.type, count + 1);
    });

    this.experienceTypes = Array.from(typeCounts.entries()).map(
      ([type, count]) => ({
        value: type,
        label: EXPERIENCE_TYPE_NAMES[type],
        icon: this.getTypeIcon(type),
        count,
      })
    );

    this.experienceTypes.sort((a, b) => b.count - a.count);
  }

  private getTypeIcon(type: ExperienceType): string {
    const icons: Record<ExperienceType, string> = {
      'full-time': 'work',
      'part-time': 'schedule',
      freelance: 'person',
      internship: 'school',
      contract: 'description',
    };
    return icons[type] || 'work';
  }
}

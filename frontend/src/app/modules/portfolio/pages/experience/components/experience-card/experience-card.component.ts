import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  Experience,
  ExperienceType,
  EXPERIENCE_TYPE_NAMES,
} from '../../../../models/experience.model';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss',
})
export class ExperienceCardComponent implements OnInit {
  @Input({ required: true }) experience!: Experience;

  duration = '';
  typeIcon = '';
  typeLabel = '';

  ngOnInit(): void {
    this.calculateDuration();
    this.setTypeInfo();
  }

  private calculateDuration(): void {
    const start = new Date(this.experience.startDate);
    const end =
      this.experience.endDate && this.experience.endDate !== 'momento'
        ? new Date(this.experience.endDate)
        : new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0 && months === 0) {
      this.duration = 'Menos de 1 mês';
    } else if (years === 0) {
      this.duration = `${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else if (months === 0) {
      this.duration = `${years} ${years === 1 ? 'ano' : 'anos'}`;
    } else {
      this.duration = `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${
        months === 1 ? 'mês' : 'meses'
      }`;
    }
  }

  private setTypeInfo(): void {
    this.typeLabel = EXPERIENCE_TYPE_NAMES[this.experience.type];
    this.typeIcon = this.getTypeIcon(this.experience.type);
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

  formatDate(dateString: string): string {
    if (dateString === 'momento') {
      return 'Presente';
    }

    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    });
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }
}
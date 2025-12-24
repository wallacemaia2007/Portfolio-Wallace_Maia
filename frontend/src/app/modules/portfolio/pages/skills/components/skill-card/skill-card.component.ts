import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Skill } from '../../../../models/skill.model';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
})
export class SkillCardComponent {
  @Input({ required: true }) skill!: Skill;

  getLevelClass(): string {
    const levelClasses = {
      1: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      2: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      3: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      4: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      5: 'bg-primary text-white shadow-glow-sm',
    };
    return levelClasses[this.skill.level as keyof typeof levelClasses] || levelClasses[1];
  }

  getLevelLabel(): string {
    const levelLabels = {
      1: 'Iniciante',
      2: 'Básico',
      3: 'Intermediário',
      4: 'Avançado',
      5: 'Expert',
    };
    return levelLabels[this.skill.level as keyof typeof levelLabels] || 'N/A';
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }
}
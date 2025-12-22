import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  Project,
  ProjectCategory,
  ProjectStatus,
  PROJECT_CATEGORY_NAMES,
  PROJECT_STATUS_NAMES,
} from '../../../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;

  /**
   * Retorna a classe CSS para o status do projeto
   */
  getStatusClass(status: ProjectStatus): string {
    const statusClasses = {
      completed: 'bg-accent text-white',
      'in-progress': 'bg-blue-500 text-white',
      planned: 'bg-yellow-500 text-white',
      paused: 'bg-slate-700 text-slate-300',
    };
    return statusClasses[status];
  }

  /**
   * Retorna o label do status
   */
  getStatusLabel(status: ProjectStatus): string {
    return PROJECT_STATUS_NAMES[status];
  }

  /**
   * Retorna o label da categoria
   */
  getCategoryLabel(category: ProjectCategory): string {
    return PROJECT_CATEGORY_NAMES[category];
  }

  /**
   * Retorna o ícone da categoria
   */
  getCategoryIcon(category: ProjectCategory): string {
    const categoryIcons: Record<ProjectCategory, string> = {
      web: 'language',
      mobile: 'phone_android',
      desktop: 'computer',
      backend: 'dns',
      frontend: 'web',
      other: 'more_horiz',
    };
    return categoryIcons[category];
  }

  /**
   * Formata a data para exibição
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    });
  }
}
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../../../shared/directives/scroll-reveal.directive';
import {
  Project,
  ProjectCategory,
  ProjectStatus,
  PROJECT_CATEGORY_NAMES,
  PROJECT_STATUS_NAMES,
} from '../../../../models/project.model';

interface ProjectCardVideoEvent {
  project: Project;
  video: HTMLVideoElement;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Input() isPreviewPlaying = false;
  @Input() revealDelay = 100;
  @Input() variant: 'primary' | 'dev' = 'primary';

  @Output() projectOpen = new EventEmitter<Project>();
  @Output() projectEnter = new EventEmitter<ProjectCardVideoEvent>();
  @Output() projectLeave = new EventEmitter<ProjectCardVideoEvent>();
  @Output() projectPreviewEnded = new EventEmitter<ProjectCardVideoEvent>();

  @ViewChild('previewVideo') previewVideo?: ElementRef<HTMLVideoElement>;

  handleOpen(): void {
    this.projectOpen.emit(this.project);
  }

  handleEnter(): void {
    if (!this.previewVideo) {
      return;
    }

    this.projectEnter.emit({
      project: this.project,
      video: this.previewVideo.nativeElement,
    });
  }

  handleLeave(): void {
    if (!this.previewVideo) {
      return;
    }

    this.projectLeave.emit({
      project: this.project,
      video: this.previewVideo.nativeElement,
    });
  }

  handlePreviewEnded(): void {
    if (!this.previewVideo) {
      return;
    }

    this.projectPreviewEnded.emit({
      project: this.project,
      video: this.previewVideo.nativeElement,
    });
  }

  getCardClass(): string {
    return this.variant === 'dev'
      ? 'bg-white dark:bg-dev-bg border border-transparent hover:border-dev/40 dark:hover:border-dev/50 hover:shadow-dev-glow hover:-translate-y-2'
      : 'bg-white dark:bg-custom-black-light shadow-lg hover:shadow-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-primary';
  }

  getMediaWrapperClass(): string {
    return this.variant === 'dev'
      ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dev-bg to-dev-bg-elevated'
      : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-custom-black to-custom-black-light';
  }

  getAccentTextClass(): string {
    return this.variant === 'dev' ? 'text-dev' : 'text-primary';
  }

  getAccentSoftBgClass(): string {
    return this.variant === 'dev' ? 'bg-dev/10 dark:bg-dev/20' : 'bg-primary/10 dark:bg-primary/20';
  }

  getAccentBadgeClass(): string {
    return this.variant === 'dev' ? 'bg-dev' : 'bg-primary';
  }

  getTechChipClass(): string {
    return this.variant === 'dev'
      ? 'bg-gray-100 dark:bg-dev-bg-elevated text-gray-700 dark:text-gray-300'
      : 'bg-gray-100 dark:bg-custom-black text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
  }

  getTechMoreClass(): string {
    return this.variant === 'dev'
      ? 'bg-dev/10 dark:bg-dev/20 text-dev dark:text-dev-light'
      : 'bg-primary/10 text-primary border border-primary/30';
  }

  getStatusClass(status: ProjectStatus): string {
    const statusClasses = {
      completed: 'bg-accent text-white',
      'in-progress': 'bg-blue-500 text-white',
      planned: 'bg-yellow-500 text-white',
      paused: 'bg-slate-700 text-slate-300',
    };
    return statusClasses[status];
  }

  getStatusLabel(status: ProjectStatus): string {
    return PROJECT_STATUS_NAMES[status];
  }

  getCategoryLabel(category: ProjectCategory): string {
    return PROJECT_CATEGORY_NAMES[category];
  }

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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    });
  }
}

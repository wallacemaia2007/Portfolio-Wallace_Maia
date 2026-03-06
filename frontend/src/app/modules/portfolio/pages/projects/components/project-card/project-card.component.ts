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

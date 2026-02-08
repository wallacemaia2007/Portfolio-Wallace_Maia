import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  Project,
  ProjectCategory,
  PROJECT_CATEGORY_NAMES,
  PROJECT_STATUS_NAMES,
} from '../../../../models/project.model';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
})
export class ProjectModalComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  @Input() project: Project | null = null;
  @Output() close = new EventEmitter<void>();

  currentImageIndex = 0;
  private imageInterval: any;
  private readonly IMAGE_INTERVAL = 4000;

  ngOnInit(): void {
    if (this.project) {
      this.startImageCarousel();
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    this.stopImageCarousel();
    document.body.style.overflow = 'auto';
  }

  onClose(): void {
    this.close.emit();
  }

  private startImageCarousel(): void {
    this.stopImageCarousel();

    if (this.project && this.project.images && this.project.images.length > 1) {
      this.imageInterval = setInterval(() => {
        this.nextImage();
      }, this.IMAGE_INTERVAL);
    }
  }

  private stopImageCarousel(): void {
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
      this.imageInterval = null;
    }
  }

  nextImage(): void {
    if (!this.project || !this.project.images) return;
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.project.images.length;
    this.resetImageCarousel();
  }

  previousImage(): void {
    if (!this.project || !this.project.images) return;
    this.currentImageIndex =
      this.currentImageIndex === 0
        ? this.project.images.length - 1
        : this.currentImageIndex - 1;
    this.resetImageCarousel();
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
    this.resetImageCarousel();
  }

  getImageUrl(path: string): string {
    if (!path) return '';
    if (
      path.startsWith('http://') ||
      path.startsWith('https://') ||
      path.startsWith('data:')
    ) {
      return path;
    }
    return path.startsWith('/') ? path : `/${path}`;
  }

  private resetImageCarousel(): void {
    if (this.project && this.project.images && this.project.images.length > 1) {
      this.startImageCarousel();
    }
  }

  getCategoryLabel(category: ProjectCategory): string {
    return PROJECT_CATEGORY_NAMES[category];
  }

  getCategoryIcon(category: ProjectCategory): string {
    const icons: Record<ProjectCategory, string> = {
      web: 'language',
      mobile: 'phone_android',
      desktop: 'computer',
      backend: 'dns',
      frontend: 'web',
      other: 'more_horiz',
    };
    return icons[category];
  }

  getStatusClass(status: string): string {
    const statusClasses: Record<string, string> = {
      completed: 'bg-accent text-white',
      'in-progress': 'bg-blue-500 text-white',
      planned: 'bg-yellow-500 text-white',
      paused: 'bg-gray-500 text-white',
    };
    return statusClasses[status] || 'bg-gray-500 text-white';
  }

  getStatusLabel(status: string): string {
    return (
      PROJECT_STATUS_NAMES[status as keyof typeof PROJECT_STATUS_NAMES] ||
      status
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    });
  }
}

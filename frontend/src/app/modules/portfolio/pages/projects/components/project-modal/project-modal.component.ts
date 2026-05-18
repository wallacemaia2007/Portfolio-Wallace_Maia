import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  PLATFORM_ID,
  inject,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  Project,
  ProjectCategory,
  PROJECT_CATEGORY_NAMES,
  PROJECT_STATUS_NAMES,
  PROJECT_CATEGORY_NAMES_EN,
  PROJECT_STATUS_NAMES_EN,
} from '../../../../models/project.model';
import { LangTextPipe } from '../../../../../shared/pipes/lang-text.pipe';
import { TranslateService } from '../../../../../../core/services/translate.service';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterLink, LangTextPipe],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
})
export class ProjectModalComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  protected translate = inject(TranslateService);

  @Input() project: Project | null = null;
  @Input() variant: 'primary' | 'dev' = 'primary';
  @Output() close = new EventEmitter<void>();
  @ViewChild('galleryVideo')
  private galleryVideo?: ElementRef<HTMLVideoElement>;

  currentMediaIndex = 0;
  expandedMediaOpen = false;
  private imageInterval: any;
  private readonly IMAGE_INTERVAL = 4000;

  ngOnInit(): void {
    if (this.project) {
      this.initializeModalMedia();
    }
  }

  ngAfterViewInit(): void {
    this.playCurrentVideoIfNeeded();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['project']) {
      return;
    }

    if (this.project) {
      this.initializeModalMedia();
      return;
    }

    this.stopImageCarousel();
    this.resetCurrentVideo();
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = 'auto';
  }

  ngOnDestroy(): void {
    this.stopImageCarousel();
    this.resetCurrentVideo();
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = 'auto';
  }

  onClose(): void {
    this.stopImageCarousel();
    this.resetCurrentVideo();
    this.expandedMediaOpen = false;
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = 'auto';
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEscapePressed(): void {
    if (this.expandedMediaOpen) {
      this.closeExpandedMedia();
      return;
    }

    this.onClose();
  }

  hasThumbVideo(): boolean {
    return Boolean(this.project?.thumbVideo?.trim());
  }

  getGalleryItemsCount(): number {
    const imageCount = this.project?.images?.length ?? 0;
    return imageCount + (this.hasThumbVideo() ? 1 : 0);
  }

  getGalleryIndexes(): number[] {
    return Array.from({ length: this.getGalleryItemsCount() }, (_, i) => i);
  }

  isCurrentMediaVideo(): boolean {
    return this.hasThumbVideo() && this.currentMediaIndex === 0;
  }

  getMediaIndexForImage(imageIndex: number): number {
    return this.hasThumbVideo() ? imageIndex + 1 : imageIndex;
  }

  private startImageCarousel(): void {
    this.stopImageCarousel();

    if (this.hasThumbVideo()) {
      return;
    }

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
    const totalItems = this.getGalleryItemsCount();
    if (totalItems === 0) return;
    this.currentMediaIndex = (this.currentMediaIndex + 1) % totalItems;
    this.onMediaChanged();
  }

  previousImage(): void {
    const totalItems = this.getGalleryItemsCount();
    if (totalItems === 0) return;
    this.currentMediaIndex =
      this.currentMediaIndex === 0
        ? totalItems - 1
        : this.currentMediaIndex - 1;
    this.onMediaChanged();
  }

  goToImage(index: number): void {
    this.currentMediaIndex = index;
    this.onMediaChanged();
  }

  openExpandedMedia(): void {
    if (this.getGalleryItemsCount() === 0) {
      return;
    }

    this.expandedMediaOpen = true;
    this.stopImageCarousel();
    this.resetCurrentVideo();
  }

  closeExpandedMedia(): void {
    if (!this.expandedMediaOpen) {
      return;
    }

    this.expandedMediaOpen = false;

    if (this.isCurrentMediaVideo()) {
      this.playCurrentVideoIfNeeded();
      return;
    }

    this.resetImageCarousel();
  }

  onExpandedBackdropClick(event: MouseEvent): void {
    event.stopPropagation();
    this.closeExpandedMedia();
  }

  onVideoEnded(): void {
    this.resetCurrentVideo();
  }

  onVideoCanPlay(): void {
    this.playCurrentVideoIfNeeded();
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

  getCurrentExpandedMediaUrl(): string {
    if (!this.project) {
      return '';
    }

    if (this.isCurrentMediaVideo()) {
      return this.getImageUrl(this.project.thumbVideo || '');
    }

    const imageIndex = this.hasThumbVideo()
      ? this.currentMediaIndex - 1
      : this.currentMediaIndex;

    const image = this.project.images?.[imageIndex] || '';
    return this.getImageUrl(image);
  }

  private resetImageCarousel(): void {
    if (
      !this.hasThumbVideo() &&
      this.project &&
      this.project.images &&
      this.project.images.length > 1
    ) {
      this.startImageCarousel();
    }
  }

  private onMediaChanged(): void {
    if (this.isCurrentMediaVideo()) {
      this.stopImageCarousel();
      this.playCurrentVideoIfNeeded(true);
      return;
    }

    this.resetCurrentVideo();
    this.resetImageCarousel();
  }

  private playCurrentVideoIfNeeded(restart = false): void {
    if (!this.isCurrentMediaVideo()) {
      return;
    }

    setTimeout(() => {
      const video = this.galleryVideo?.nativeElement;
      if (!video) {
        return;
      }

      video.muted = true;
      if (restart) {
        video.currentTime = 0;
      }
      void video.play().catch(() => undefined);
    });
  }

  private resetCurrentVideo(): void {
    const video = this.galleryVideo?.nativeElement;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }

  getCategoryLabel(category: ProjectCategory): string {
    return this.translate.isEn() ? PROJECT_CATEGORY_NAMES_EN[category] : PROJECT_CATEGORY_NAMES[category];
  }

  getAccentTextClass(): string {
    return this.variant === 'dev' ? 'text-dev' : 'text-primary';
  }

  getAccentBgClass(): string {
    return this.variant === 'dev' ? 'bg-dev' : 'bg-primary';
  }

  getAccentHoverClass(): string {
    return this.variant === 'dev' ? 'hover:bg-dev-dark' : 'hover:bg-primary-dark';
  }

  getAccentSoftBgClass(): string {
    return this.variant === 'dev' ? 'bg-dev/10 dark:bg-dev/20' : 'bg-primary/10 dark:bg-primary/20';
  }

  getAccentSoftBgSubtleClass(): string {
    return this.variant === 'dev' ? 'bg-dev/5 dark:bg-dev/10' : 'bg-primary/5 dark:bg-primary/10';
  }

  getAccentBorderClass(): string {
    return this.variant === 'dev' ? 'border-dev/30' : 'border-primary/30';
  }

  getAccentBorderSoftClass(): string {
    return this.variant === 'dev' ? 'border-dev/20' : 'border-primary/20';
  }

  getAccentButtonClass(): string {
    return this.variant === 'dev'
      ? 'bg-dev hover:bg-dev-dark'
      : 'bg-primary hover:bg-primary-dark';
  }

  getModalSurfaceClass(): string {
    return this.variant === 'dev'
      ? 'bg-dev-bg-surface text-dev-text-primary'
      : 'bg-white dark:bg-custom-black-light';
  }

  getModalThemeClass(): string {
    return this.variant === 'dev' ? 'modal-theme-dev' : 'modal-theme-primary';
  }

  getAccentChipClass(): string {
    return this.variant === 'dev'
      ? 'bg-dev/10 text-dev border-dev/30 hover:bg-dev/20'
      : 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20';
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
    const key = status as keyof typeof PROJECT_STATUS_NAMES;
    return this.translate.isEn()
      ? (PROJECT_STATUS_NAMES_EN[key] || status)
      : (PROJECT_STATUS_NAMES[key] || status);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    });
  }

  private initializeModalMedia(): void {
    this.currentMediaIndex = 0;
    this.expandedMediaOpen = false;
    this.startImageCarousel();
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = 'hidden';
    this.playCurrentVideoIfNeeded(true);
  }
}

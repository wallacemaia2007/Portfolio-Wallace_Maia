import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input({ required: true }) src = '';
  @Input() poster = '';
  @Input() autoplay = false;
  @Input() loop = false;
  @Input() muted = false;
  @Input() controls = false;
  @Input() playsInline = false;
  @Input() preload: 'none' | 'metadata' | 'auto' = 'metadata';
  @Input() lazy = true;
  @Input() active = false;
  @Input() className = '';
  @Input() fallbackMessage = 'Vídeo indisponível';
  @Input() retryAttempts = 1;

  @Output() videoEnded = new EventEmitter<void>();
  @Output() videoClick = new EventEmitter<MouseEvent>();
  @Output() videoReady = new EventEmitter<void>();

  @ViewChild('videoEl') private videoEl?: ElementRef<HTMLVideoElement>;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private observer?: IntersectionObserver;
  private loaded = false;
  private loadAttempts = 0;
  private diagnosed = false;
  failed = false;

  get videoElement(): HTMLVideoElement | undefined {
    return this.videoEl?.nativeElement;
  }

  get source(): string | null {
    if (!this.loaded || this.failed) return null;
    return this.src || null;
  }

  ngAfterViewInit(): void {
    if (this.lazy) {
      this.setupLazyLoading();
    } else {
      this.activate();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.handleSrcChange();
    }
    if (changes['active'] && this.active) {
      this.activate();
      if (this.autoplay) {
        this.tryPlay();
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onCanPlay(): void {
    this.diagnosed = false;
    this.videoReady.emit();
    if (this.autoplay && this.active) {
      this.tryPlay();
    }
  }

  onLoadedMetadata(): void {
    if (this.autoplay && this.active) {
      this.tryPlay();
    }
  }

  onCanPlayThrough(): void {
    if (this.autoplay && this.active) {
      this.tryPlay();
    }
  }

  onVideoError(event?: Event): void {
    const video = this.videoEl?.nativeElement;
    const error = video?.error;

    console.error('[VideoPlayer] erro ao carregar vídeo:', {
      src: this.src,
      active: this.active,
      lazy: this.lazy,
      loaded: this.loaded,
      networkState: video?.networkState,
      readyState: video?.readyState,
      errorCode: error?.code,
      errorMessage: error?.message,
      target: this.elementRef.nativeElement,
      originalEvent: event?.type,
    });

    if (this.loadAttempts < this.retryAttempts && this.src) {
      this.loadAttempts += 1;
      const retryVideo = this.videoEl?.nativeElement;
      if (retryVideo) {
        retryVideo.src = this.src;
        retryVideo.load();
      }
      return;
    }

    this.failed = true;
    this.changeDetectorRef.detectChanges();
  }

  onWaiting(): void {
    this.logDiagnostic('waiting');
  }

  onStalled(): void {
    this.logDiagnostic('stalled');
  }

  private handleSrcChange(): void {
    const wasLoaded = this.loaded;
    this.failed = false;
    this.loadAttempts = 0;
    this.diagnosed = false;

    if (!wasLoaded) return;

    const video = this.videoEl?.nativeElement;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    if (video.getAttribute('src') !== this.src) {
      video.removeAttribute('src');
    }
    if (this.src) {
      video.src = this.src;
      video.load();
    }
  }

  private activate(): void {
    if (this.loaded) return;
    this.loaded = true;
    this.observer?.disconnect();
    this.changeDetectorRef.markForCheck();
  }

  private tryPlay(): void {
    const video = this.videoEl?.nativeElement;
    if (!video || !this.src || !this.loaded || this.failed) return;
    if (video.readyState >= 2) {
      void video.play().catch(() => undefined);
    }
  }

  private logDiagnostic(eventName: string): void {
    if (this.diagnosed) return;
    this.diagnosed = true;
    const video = this.videoEl?.nativeElement;
    console.warn(`[VideoPlayer] ${eventName}:`, {
      src: this.src,
      networkState: video?.networkState,
      readyState: video?.readyState,
    });
  }

  private setupLazyLoading(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.activate();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          this.activate();
          this.changeDetectorRef.detectChanges();
          if (this.autoplay && this.active) {
            this.tryPlay();
          }
        });
      },
      { rootMargin: '200px 0px' },
    );

    this.observer.observe(this.elementRef.nativeElement);
  }
}

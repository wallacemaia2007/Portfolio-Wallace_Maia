import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading = signal<boolean>(false);

  private activeRequests = 0;

  show(): void {
    this.activeRequests++;
    this.loading.set(true);
  }

  hide(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    this.loading.set(this.activeRequests > 0);
  }
}

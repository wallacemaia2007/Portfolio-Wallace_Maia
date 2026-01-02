import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './modules/shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule],
  template: ` <app-loading></app-loading>
    <router-outlet />`,
  styles: `
  :host {
  display: block;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.fixed {
  &.inset-0 {
    backdrop-filter: blur(8px);
  }
}


.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #9b1b1f transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #9b1b1f;
    border-radius: 4px;

    &:hover {
      background: #7a1619;
    }
  }
}

:host-context(.dark) {
  .scrollbar-thin {
    scrollbar-color: #9b1b1f rgba(255, 255, 255, 0.1);

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}

.transition-opacity {
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }`,
})
export class AppComponent {}

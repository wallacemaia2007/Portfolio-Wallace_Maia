import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type SocialLinkItem = {
  name: string;
  url: string;
  src: string;
};

@Component({
  selector: 'app-social-links-dev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-links-dev.component.html',
  styleUrl: './social-links-dev.component.scss',
})
export class SocialLinksDevComponent {
  @Input() links: SocialLinkItem[] = [];
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() tone: 'dev' | 'accent' = 'dev';

  getSizeClass(): string {
    const sizes = {
      small: 'w-8 h-8',
      medium: 'w-10 h-10',
      large: 'w-12 h-12',
    };
    return sizes[this.size];
  }

  getIconClass(): string {
    const sizes = {
      small: 'w-4 h-4',
      medium: 'w-5 h-5',
      large: 'w-6 h-6',
    };
    return sizes[this.size];
  }

  getToneClasses(): string {
    if (this.tone === 'accent') {
      return 'text-accent dark:text-accent-light border-accent/20 dark:border-accent/30 hover:bg-accent hover:border-accent/60';
    }

    return 'text-dev dark:text-dev-light border-dev/20 dark:border-dev/30 hover:bg-dev hover:border-dev/60';
  }
}

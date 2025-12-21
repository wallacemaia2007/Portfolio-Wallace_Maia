import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss'
})
export class SocialLinksComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  public socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/seu-usuario',
      icon: 'code',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/seu-usuario',
      icon: 'business',
      color: '#0077B5'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/seu-usuario',
      icon: 'chat',
      color: '#1DA1F2'
    },
    {
      name: 'Email',
      url: 'mailto:seu-email@email.com',
      icon: 'email',
      color: '#EA4335'
    },
  ];

  getSizeClass(): string {
    const sizes = {
      small: 'w-8 h-8',
      medium: 'w-10 h-10',
      large: 'w-12 h-12'
    };
    return sizes[this.size];
  }
}
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PortfolioService } from '../../../portfolio/services/portfolio.service';
import { SocialLink } from '../../../portfolio/models/social-link.model';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent implements OnInit {
  
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  private portfolioService = inject(PortfolioService);

  public socialLinks: SocialLink[] = [
    { name: '', url: '', icon: '', color: '' },
  ];

  ngOnInit(): void {
    this.portfolioService.getSocialLinks().subscribe((links) => {
      this.socialLinks = links;
    });
  }

  getSizeClass(): string {
    const sizes = {
      small: 'w-8 h-8',
      medium: 'w-10 h-10',
      large: 'w-12 h-12',
    };
    return sizes[this.size];
  }
}

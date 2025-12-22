import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../../portfolio/services/portfolio.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  theme: string | null = null;
  personalInfo: any = {
    name: '',
    role: '',
    description: '',
    avatar: '',
  };
  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe((info) => {
      this.personalInfo = info;
    });

    this.theme = localStorage.getItem('theme');
  }

  downloadCV(): void {
    window.open('assets/cv.pdf', '_blank');
  }
}

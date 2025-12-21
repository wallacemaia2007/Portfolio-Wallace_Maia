import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  public personalInfo = {
    name: 'João Silva',
    role: 'Desenvolvedor Full Stack',
    description: 'Especializado em criar aplicações web modernas e escaláveis com Angular, React e Node.js',
    avatar: 'assets/images/avatar.jpg',
  };

  public stats = [
    { value: '5+', label: 'Anos de Experiência' },
    { value: '50+', label: 'Projetos Completos' },
    { value: '30+', label: 'Clientes Satisfeitos' },
  ];

  downloadCV(): void {
    window.open('assets/cv.pdf', '_blank');
  }
}
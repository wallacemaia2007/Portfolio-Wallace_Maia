import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ScrollRevealDirective,
    MatTooltip,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly personalInfo = {
    fullName: 'Wallace Maia',
    bio: 'Desenvolvedor Full Stack apaixonado por criar experiências web incríveis e soluções inovadoras.',
    email: 'wallacemaia2007@gmail.com',
    phone: '+55 (35) 91003-6806',
    location: 'Uberlândia, MG - Brasil',
  };

  readonly socialLinks = [
    { name: 'GitHub', url: 'https://github.com/wallacemaia2007', icon: 'code' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/wallacemaia-dev/', icon: 'person' },
    { name: 'Instagram', url: 'https://www.instagram.com/', icon: 'photo_camera' },
    { name: 'WhatsApp', url: 'https://wa.me/5535910036806', icon: 'chat' },
  ];

  readonly quickLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Serviços', href: '#works' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Stack', href: '#stack' },
    { label: 'Contato', href: '#contact' },
  ];

  readonly currentYear = new Date().getFullYear();

  scrollTo(event: Event, href: string): void {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

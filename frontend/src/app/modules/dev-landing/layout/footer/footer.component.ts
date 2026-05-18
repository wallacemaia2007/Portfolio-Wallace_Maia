import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SocialLinksDevComponent } from '../../../shared/components/social-links-dev/social-links-dev.component';
import { TranslateService } from '../../../../core/services/translate.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective, MatTooltip, SocialLinksDevComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly translate = inject(TranslateService);
  readonly personalInfo = {
    fullName: 'Wallace Maia',
    bio: 'Desenvolvedor Full Stack apaixonado por criar experiências web incríveis e soluções inovadoras.',
    email: 'wallacemaia2007@gmail.com',
    phone: '+55 (35) 91003-6806',
    location: 'Uberlândia, MG - Brasil',
  };

  readonly socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/wallacemaia2007',
      src: 'assets/icons/github.svg',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/wallacemaia-dev/',
      src: 'assets/icons/linkedin.svg',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/',
      src: 'assets/icons/instagram.png',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/5535910036806',
      src: 'assets/icons/whatsapp.svg',
    },
    {
      name: 'Fiverr',
      url: 'https://br.fiverr.com/wallace_maia?public_mode=true',
      src: 'assets/icons/fiverr.svg',
    },
  ];

  readonly quickLinks = [
    { label: 'home', href: '#hero' },
    { label: 'services', href: '#works' },
    { label: 'projects', href: '#projects' },
    { label: 'stack', href: '#stack' },
    { label: 'contact', href: '#contact' },
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

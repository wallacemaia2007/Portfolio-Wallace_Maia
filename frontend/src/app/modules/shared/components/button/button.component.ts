import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

export interface ButtonModel {
  label: string;
  icon?: string;
  color: string;
  link: string;
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  constructor(private router: Router) {}

  @Input() buttonData!: ButtonModel;

  getColorClasses(): string {
    const color = this.buttonData.color.toLowerCase();

    const colorMap: Record<string, string> = {
      primary: 'bg-primary hover:bg-primary-dark text-white',
      accent: 'bg-accent hover:bg-accent-dark text-white',
      theme: 'bg-beige dark:bg-custom-black hover:bg-beige-dark dark:hover:bg-custom-black-light text-custom-black dark:text-white',
      contrast: 'bg-beige-dark dark:bg-custom-black-light hover:bg-beige-light dark:hover:bg-custom-black-dark text-custom-black dark:text-white',
      'beige': 'bg-beige hover:bg-beige-dark text-custom-black',
      'beige-light': 'bg-beige-light hover:bg-beige text-custom-black',
      'beige-dark': 'bg-beige-dark hover:bg-beige text-custom-black',
      'custom-black': 'bg-custom-black hover:bg-custom-black-light text-white',
      'custom-black-light': 'bg-custom-black-light hover:bg-custom-black text-white',
      'accent-light': 'bg-accent-light hover:bg-accent text-white',
      'accent-dark': 'bg-accent-dark hover:bg-accent text-white',
    };

    return colorMap[color] || colorMap['primary'];
  }

  navigateToLink(link: string): void {
    if (!link) return;

    if (link.startsWith('#')) {
      const el = document.querySelector(link);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (/\.pdf($|\?)/i.test(link)) {
      const url = link.startsWith('http')
        ? link
        : link.startsWith('/')
          ? link
          : `/${link}`;
      window.open(url, '_blank');
      return;
    }

    if (/^(https?:\/\/|mailto:|tel:)/i.test(link)) {
      window.open(link, '_blank');
      return;
    }

    this.router.navigateByUrl(link);
  }
}

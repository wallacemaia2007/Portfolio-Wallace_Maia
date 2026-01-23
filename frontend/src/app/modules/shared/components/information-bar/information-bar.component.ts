import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

export interface InformationBarData {
  title: string;
  description: string;
  buttons: InformationBarButton[];
}

export interface InformationBarButton {
  text: string;
  icon?: string;
  color: boolean;
  link: string;
}

@Component({
  selector: 'app-information-bar',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './information-bar.component.html',
  styleUrl: './information-bar.component.scss',
})
export class InformationBarComponent {
  constructor(private router: Router) {}

  @Input() data!: InformationBarData;

  navigateToLink(link: string): void {
    if (!link) return;

    // Hash anchor within the current page (e.g., #values)
    if (link.startsWith('#')) {
      const el = document.querySelector(link);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Direct asset links (e.g., PDFs) should open in a new tab
    if (/\.pdf($|\?)/i.test(link)) {
      const url = link.startsWith('http') ? link : link.startsWith('/') ? link : `/${link}`;
      window.open(url, '_blank');
      return;
    }

    // External links (http, https, mailto, tel)
    if (/^(https?:\/\/|mailto:|tel:)/i.test(link)) {
      window.open(link, '_blank');
      return;
    }

    // Default: internal route
    this.router.navigateByUrl(link);
  }
}

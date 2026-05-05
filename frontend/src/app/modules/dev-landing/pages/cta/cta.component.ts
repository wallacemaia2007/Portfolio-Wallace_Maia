import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss',
})
export class CtaComponent {
  readonly whatsappLink =
    'https://wa.me/5535910036806?text=Ola%20Wallace%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20servicos!';

  scrollTo(event: Event, target: string): void {
    event.preventDefault();
    const el = document.querySelector<HTMLElement>(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

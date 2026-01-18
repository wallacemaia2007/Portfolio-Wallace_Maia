import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { FaqService } from '../../../portfolio/services/faq.service';
import { Faq } from '../../../portfolio/models/faq.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, ScrollRevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent implements OnInit {
  private faqService = inject(FaqService);

  @Input() title = 'Perguntas Frequentes';
  @Input() subtitle?: string;
  @Input() limit?: number;
  @Input() showContactCta = true;
  @Input() delayAnimation = 400;

  faqs: Faq[] = [];
  isLoading = true;
  openFaqIds = new Set<string>();

  ngOnInit(): void {
    this.loadFaqs();
  }

  private loadFaqs(): void {
    this.isLoading = true;
    this.faqService
      .getFaqs()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (faqs) => {
          this.faqs = this.limit ? faqs.slice(0, this.limit) : faqs;
        },
        error: (error) => {
          console.error('Erro ao carregar FAQs:', error);
        },
      });
  }

  toggleFaq(faqId: string): void {
    if (this.openFaqIds.has(faqId)) {
      this.openFaqIds.delete(faqId);
    } else {
      this.openFaqIds.add(faqId);
    }
  }

  isOpen(faqId: string): boolean {
    return this.openFaqIds.has(faqId);
  }

  openAll(): void {
    this.faqs.forEach((faq) => this.openFaqIds.add(faq.id));
  }

  closeAll(): void {
    this.openFaqIds.clear();
  }
}

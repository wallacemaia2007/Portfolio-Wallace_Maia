import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../services/contact.service';
import { PortfolioService } from '../../services/portfolio.service';
import { SocialLinksComponent } from '../../../shared/components/social-links/social-links.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { FaqComponent } from '../../../shared/components/faq/faq.component';
import {
  InformationBarComponent,
  InformationBarData,
} from '../../../shared/components/information-bar/information-bar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    SocialLinksComponent,
    ScrollRevealDirective,
    SectionHeaderComponent,
    FaqComponent,
    InformationBarComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private portfolioService = inject(PortfolioService);
  private toastr = inject(ToastrService);

  contactForm!: FormGroup;
  isSubmitting = false;
  personalInfo: any = null;

  contactInfoCards = [
    {
      icon: 'assets/icons/gmail.svg',
      title: 'Email',
      content: '',
      link: 'mailto:wallacemaia2007@gmail.com',
      color: 'primary',
    },
    {
      icon: 'assets/icons/whatsapp.svg',
      title: 'Whatzapp',
      content: '',
      link: 'https://wa.me/35910036806',
      color: 'primary',
    },
    {
      icon: 'assets/icons/linkedin.svg',
      title: 'Linkedin',
      content: '',
      link: 'https://www.linkedin.com/in/wallacemaia-dev/',
      color: 'primary',
    },
  ];

  ctaData: InformationBarData = {
    title: 'Ainda não ficou convencido?',
    description:
      'Dê mais uma olhada em meus projetos ou então meu currículo! Tenho certeza que vai achar algo que te interesse!',
    buttons: [
      {
        label: 'Ver Projetos',
        icon: 'work',
        color: 'theme',
        link: '/projects',
      },
      {
        label: 'Download CV',
        icon: 'download',
        color: 'theme',
        link: 'assets/cv.pdf',
      },
    ],
  };

  ngOnInit(): void {
    this.initializeForm();
    this.loadPersonalInfo();
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  private loadPersonalInfo(): void {
    this.portfolioService.getPersonalInfo().subscribe({
      next: (info) => {
        this.personalInfo = info;
        this.updateContactInfoCards();
      },
      error: (error) => {
        console.error('Erro ao carregar informações:', error);
      },
    });
  }

  private updateContactInfoCards(): void {
    if (this.personalInfo) {
      this.contactInfoCards[0].content = this.personalInfo.email;
      this.contactInfoCards[0].link = `mailto:${this.personalInfo.email}`;

      this.contactInfoCards[1].content = this.personalInfo.phone;
      let phoneNumber = this.personalInfo.phone;
      phoneNumber = phoneNumber
        .replaceAll(' ', '')
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace('+', '')
        .replace('55', '');
      this.contactInfoCards[1].link = `https://wa.me/${phoneNumber}`;

      this.contactInfoCards[2].content = this.personalInfo.linkedin;
      this.contactInfoCards[2].content =
        this.contactInfoCards[2].content.replace(
          'https://www.linkedin.com/in/',
          '',
        );
      this.contactInfoCards[2].link = this.personalInfo.linkedin;
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Verificar rate limiting
    if (!this.contactService.canSubmit()) {
      const secondsRemaining = this.contactService.getTimeUntilNextSubmission();
      this.toastr.warning(
        `Por favor, aguarde ${secondsRemaining} segundos antes de enviar outra mensagem.`,
      );
      return;
    }

    this.isSubmitting = true;

    // Sanitizar inputs
    const formData = {
      name: this.contactService.sanitizeInput(this.contactForm.value.name),
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone
        ? this.contactService.sanitizeInput(this.contactForm.value.phone)
        : undefined,
      subject: this.contactForm.value.subject,
      message: this.contactService.sanitizeInput(
        this.contactForm.value.message,
      ),
    };

    this.contactService.sendMessage(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(
            'Mensagem enviada com sucesso! Em breve entrarei em contato.',
          );
          this.contactForm.reset({ subject: '' });
          this.contactService.recordSubmission();
        } else {
          this.toastr.error(response.message || 'Erro ao enviar mensagem.');
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Erro ao enviar mensagem:', error);
        this.toastr.error(
          'Erro ao enviar mensagem. Tente novamente mais tarde.',
        );
        this.isSubmitting = false;
      },
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.contactForm.get(fieldName);

    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    if (control?.hasError('email')) {
      return 'Email inválido';
    }

    if (control?.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Mínimo de ${minLength} caracteres`;
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  openEmail(): void {
    if (this.personalInfo?.email) {
      this.contactService.openEmailClient(
        this.personalInfo.email,
        'Contato via Portfolio',
      );
    }
  }

  openWhatsApp(): void {
    if (this.personalInfo?.phone) {
      const phone = this.personalInfo.phone.replace(/\D/g, '');
      this.contactService.openWhatsApp(
        phone,
        'Olá! Vi seu portfolio e gostaria de conversar.',
      );
    }
  }
}

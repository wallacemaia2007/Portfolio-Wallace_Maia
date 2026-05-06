import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SocialLinksDevComponent } from '../../../shared/components/social-links-dev/social-links-dev.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    ScrollRevealDirective,
    SectionHeaderComponent,
    SocialLinksDevComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  submitMessage = '';

  contactForm: FormGroup;

  readonly contactInfo = {
    email: 'wallacemaia2007@gmail.com',
    phone: '+55 (35) 91003-6806',
    location: 'Uberlândia, MG - Brasil',
    linkedin: 'https://www.linkedin.com/in/wallacemaia-dev/',
    linkedinDisplay: 'wallacemaia-dev',
    github: 'https://github.com/wallacemaia2007',
    githubDisplay: 'wallacemaia2007',
    fiverr: 'https://br.fiverr.com/wallace_maia?public_mode=true',
    fiverrDisplay: 'wallace_maia',
  };

  readonly whatsappLink = 'https://wa.me/5535910036806';
  readonly whatsappDisplay = '+55 (35) 91003-6806';

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
      url: 'https://www.instagram.com/wallace_maia._',
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

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const formData = this.contactForm.value;

    // Mantém a chamada POST para o Resend (envio de email)
    this.http.post(`${environment.apiUrl}/contact`, formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.submitMessage =
          'Mensagem enviada com sucesso. Retornarei em breve.';
        this.contactForm.reset();
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = true;
        this.submitMessage =
          'Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.';
      },
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!field && field.invalid && field.touched;
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Campo obrigatorio';
    if (field.errors['email']) return 'Email invalido';
    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Minimo de ${minLength} caracteres`;
    }
    return '';
  }
}

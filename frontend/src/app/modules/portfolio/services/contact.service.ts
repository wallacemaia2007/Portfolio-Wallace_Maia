import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactForm, ContactResponse } from '../models/contact.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly apiUrl = environment.apiUrl;

  private lastSubmissionTime = 0;
  private readonly minTimeBetweenSubmissions = 30000;

  constructor(private http: HttpClient) {}

  sendMessage(data: ContactForm): Observable<ContactResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<ContactResponse>(`${this.apiUrl}/contact`, data, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(() => ({
            success: false,
            message:
              error?.error?.message || 'Erro ao enviar mensagem. Tente novamente.',
            errorCode: error?.error?.errorCode,
            errorCommand: error?.error?.errorCommand,
          })),
        ),
      );
  }

  canSubmit(): boolean {
    return (
      Date.now() - this.lastSubmissionTime >= this.minTimeBetweenSubmissions
    );
  }

  recordSubmission(): void {
    this.lastSubmissionTime = Date.now();
  }

  getTimeUntilNextSubmission(): number {
    const diff =
      this.minTimeBetweenSubmissions - (Date.now() - this.lastSubmissionTime);

    return Math.max(0, Math.ceil(diff / 1000));
  }

  sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, '');
  }

  openEmailClient(to: string, name?: string): void {
    const subject = encodeURIComponent('Contato via Portfólio');
    const body = encodeURIComponent(
      `Olá Wallace,

      Vi seu portfólio e gostaria de conversar sobre:

      ( ) Projeto
      ( ) Orçamento
      ( ) Vaga
      ( ) Parceria

      Detalhes:
      ____________________________________________________


      Atenciosamente,
${name ?? ''}`,
    );

    const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;

    window.open(mailtoUrl, '_self');
  }

  openWhatsApp(phone: string, message?: string): void {
    const text = message ? encodeURIComponent(message) : '';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }
}

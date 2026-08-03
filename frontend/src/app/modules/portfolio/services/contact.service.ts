import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactForm, ContactResponse } from '../models/contact.model';
import { environment } from '../../../../environments/environment';

const DEFAULT_EMAIL_SUBJECT = 'Contato via Portfolio';
const DEFAULT_EMAIL_BODY = `Ola Wallace,

Vi seu portfolio e gostaria de conversar sobre:

( ) Projeto
( ) Orcamento
( ) Vaga
( ) Parceria

Detalhes:
____________________________________________________


Atenciosamente,`;

export function createGmailComposeUrl(to: string, name?: string): string {
  const subject = encodeURIComponent(DEFAULT_EMAIL_SUBJECT);
  const signature = name?.trim() ? `\n${name.trim()}` : '';
  const body = encodeURIComponent(`${DEFAULT_EMAIL_BODY}${signature}`);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;
}

export function normalizeEmailLink(url: string): string {
  if (!/^mailto:/i.test(url)) return url;

  const email = url.replace(/^mailto:/i, '').split('?')[0].trim();

  return email ? createGmailComposeUrl(email) : url;
}

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
    window.open(createGmailComposeUrl(to, name), '_blank', 'noopener,noreferrer');
  }

  openWhatsApp(phone: string, message?: string): void {
    const text = message ? encodeURIComponent(message) : '';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }
}

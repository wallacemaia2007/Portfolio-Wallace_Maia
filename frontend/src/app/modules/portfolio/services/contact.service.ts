import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { ContactForm, ContactResponse } from '../models/contact.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  // ============================================
  // SEND MESSAGE
  // ============================================

  /**
   * Envia mensagem do formulário de contato
   *
   * Pode ser adaptado para:
   * - API própria
   * - EmailJS
   * - FormSpree
   * - Netlify Forms
   * - Google Forms
   */
  sendMessage(contactData: ContactForm): Observable<ContactResponse> {
    // OPÇÃO 1: Enviar para API própria
    if (this.apiUrl) {
      return this.sendToAPI(contactData);
    }

    // OPÇÃO 2: Enviar para EmailJS (recomendado para portfolios)
    // return this.sendToEmailJS(contactData);

    // OPÇÃO 3: Simulação (para desenvolvimento)
    return this.simulateSubmission(contactData);
  }

  /**
   * Envia para API própria
   */
  private sendToAPI(contactData: ContactForm): Observable<ContactResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<ContactResponse>(`${this.apiUrl}/contact`, contactData, { headers })
      .pipe(
        map((response) => ({
          ...response,
          success: response.success !== undefined ? response.success : true,
          message: response.message || 'Mensagem enviada com sucesso!',
        })),
        catchError((error) => {
          console.error('Erro ao enviar mensagem:', error);
          return throwError(() => ({
            success: false,
            message: 'Erro ao enviar mensagem. Tente novamente.',
          }));
        })
      );
  }

  /**
   * Envia usando EmailJS
   * Documentação: https://www.emailjs.com/docs/
   *
   * Passos:
   * 1. Criar conta em emailjs.com
   * 2. Configurar template de email
   * 3. Obter Service ID, Template ID e Public Key
   * 4. Descomentar e configurar este método
   */
  private sendToEmailJS(contactData: ContactForm): Observable<ContactResponse> {
    // Instalar: npm install @emailjs/browser
    // import emailjs from '@emailjs/browser';

    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    // const templateParams = {
    //   from_name: contactData.name,
    //   from_email: contactData.email,
    //   subject: contactData.subject || 'Contato via Portfolio',
    //   message: contactData.message,
    //   to_name: 'João Silva', // Seu nome
    // };

    // return from(
    //   emailjs.send(serviceId, templateId, templateParams, publicKey)
    // ).pipe(
    //   map(() => ({
    //     success: true,
    //     message: 'Mensagem enviada com sucesso!'
    //   })),
    //   catchError(error => throwError(() => ({
    //     success: false,
    //     message: 'Erro ao enviar mensagem.'
    //   })))
    // );

    return of({
      success: false,
      message: 'EmailJS não configurado. Veja o comentário no código.',
    });
  }

  /**
   * Simula envio de mensagem (para desenvolvimento)
   */
  private simulateSubmission(
    contactData: ContactForm
  ): Observable<ContactResponse> {
    console.log('📧 Mensagem simulada:', contactData);

    // Simula latência de rede
    return of({
      success: true,
      message: 'Mensagem enviada com sucesso! (Simulação)',
      data: {
        id: Math.random().toString(36).substring(2, 9),
        sentAt: new Date().toISOString(),
      },
    }).pipe(delay(1000));
  }

  // ============================================
  // VALIDATION
  // ============================================

  /**
   * Valida email
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Valida telefone brasileiro
   */
  validatePhone(phone: string): boolean {
    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');

    // Valida formato brasileiro (10 ou 11 dígitos)
    return cleaned.length === 10 || cleaned.length === 11;
  }

  /**
   * Valida formulário completo
   */
  validateForm(contactData: ContactForm): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!contactData.name || contactData.name.trim().length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
    }

    if (!this.validateEmail(contactData.email)) {
      errors.push('Email inválido');
    }

    if (!contactData.message || contactData.message.trim().length < 10) {
      errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }

    if (contactData.phone && !this.validatePhone(contactData.phone)) {
      errors.push('Telefone inválido');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // ============================================
  // DIRECT EMAIL/WHATSAPP
  // ============================================

  /**
   * Abre cliente de email padrão
   */
  openEmailClient(to: string, subject?: string, body?: string): void {
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);

    const mailto = `mailto:${to}?${params.toString()}`;
    window.location.href = mailto;
  }

  /**
   * Abre WhatsApp Web
   */
  openWhatsApp(phone: string, message?: string): void {
    const encodedMessage = message ? encodeURIComponent(message) : '';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Abre Telegram
   */
  openTelegram(username: string): void {
    window.open(`https://t.me/${username}`, '_blank');
  }

  // ============================================
  // SPAM PROTECTION
  // ============================================

  /**
   * Rate limiting básico
   * Previne múltiplas submissões em curto período
   */
  private lastSubmissionTime: number = 0;
  private readonly minTimeBetweenSubmissions = 30000; // 30 segundos

  canSubmit(): boolean {
    const now = Date.now();
    const timeSinceLastSubmission = now - this.lastSubmissionTime;
    return timeSinceLastSubmission >= this.minTimeBetweenSubmissions;
  }

  recordSubmission(): void {
    this.lastSubmissionTime = Date.now();
  }

  getTimeUntilNextSubmission(): number {
    const now = Date.now();
    const timeSinceLastSubmission = now - this.lastSubmissionTime;
    const timeRemaining =
      this.minTimeBetweenSubmissions - timeSinceLastSubmission;
    return Math.max(0, Math.ceil(timeRemaining / 1000)); // retorna em segundos
  }

  // ============================================
  // UTILITIES
  // ============================================

  /**
   * Formata telefone para padrão brasileiro
   */
  formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 11) {
      // (11) 99999-9999
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`;
    } else if (cleaned.length === 10) {
      // (11) 9999-9999
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
        6
      )}`;
    }

    return phone;
  }

  /**
   * Sanitiza input do usuário
   */
  sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/[<>]/g, ''); // Remove < e >
  }
}
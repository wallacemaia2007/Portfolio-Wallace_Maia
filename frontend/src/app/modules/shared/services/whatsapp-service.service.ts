import { Injectable, inject } from '@angular/core';
import { TranslateService } from '../../../core/services/translate.service';

export const whatsappNumber = '5535910036806';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private translate = inject(TranslateService);

  private normalizePhone(value: string): string {
    return value.replace(/\D/g, '');
  }

  getGenericOrderLink(): string {
    const mensagemPadrao = this.translate.translate('whatsapp.generic');
    const phone = this.normalizePhone(whatsappNumber);
    return `https://wa.me/${phone}?text=${encodeURIComponent(mensagemPadrao)}`;
  }

  getItemOrderLink(itemName: string): string {
    const mensagem = this.translate.translate('whatsapp.project').replace('{project}', itemName);
    const phone = this.normalizePhone(whatsappNumber);
    return `https://wa.me/${phone}?text=${encodeURIComponent(mensagem)}`;
  }

  getWorkDetailsLink(itemName: string): string {
    const mensagem = this.translate.translate('whatsapp.work').replace('{work}', itemName);
    const phone = this.normalizePhone(whatsappNumber);
    return `https://wa.me/${phone}?text=${encodeURIComponent(mensagem)}`;
  }
}

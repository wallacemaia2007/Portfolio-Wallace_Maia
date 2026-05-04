import { Injectable } from '@angular/core';

export const whatsappNumber = '5535910036806';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private normalizePhone(value: string): string {
    return value.replace(/\D/g, '');
  }

  getGenericOrderLink(): string {
    const mensagemPadrao =
      'Olá! Gostaria de saber sobre os projetos e seu trabalho!';
    const phone = this.normalizePhone(whatsappNumber);
    return `https://wa.me/${phone}?text=${encodeURIComponent(mensagemPadrao)}`;
  }

  getItemOrderLink(itemName: string): string {
    const mensagem = `Olá! Quero saber mais sobre o: ${itemName}`;
    const phone = this.normalizePhone(whatsappNumber);
    return `https://wa.me/${phone}?text=${encodeURIComponent(mensagem)}`;
  }
}

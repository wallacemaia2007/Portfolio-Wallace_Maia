import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '../../../core/services/translate.service';

@Pipe({
  name: 'langText',
  standalone: true,
  pure: false,
})
export class LangTextPipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(ptValue: string | undefined | null, enValue: string | undefined | null): string {
    if (!ptValue && !enValue) return '';
    if (this.translate.currentLang() === 'en') {
      return enValue || ptValue || '';
    }
    return ptValue || enValue || '';
  }
}

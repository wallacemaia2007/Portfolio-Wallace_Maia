import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '../../../../core/services/translate.service';

@Pipe({
  name: 'booleanStatus',
  standalone: true,
})
export class BooleanStatusPipe implements PipeTransform {
  private translate = inject(TranslateService);

  public transform(value?: boolean): string {
    if (value === undefined) {
      return '';
    }
    return value ? this.translate.translate('common.active') : this.translate.translate('common.inactive');
  }
}

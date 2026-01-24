import { Component, Input } from '@angular/core';
import { ButtonModel, ButtonComponent } from '../button/button.component';

export interface InformationBarData {
  title: string;
  description: string;
  buttons: ButtonModel[];
}

@Component({
  selector: 'app-information-bar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './information-bar.component.html',
  styleUrl: './information-bar.component.scss',
})
export class InformationBarComponent {
  @Input() data!: InformationBarData;
}

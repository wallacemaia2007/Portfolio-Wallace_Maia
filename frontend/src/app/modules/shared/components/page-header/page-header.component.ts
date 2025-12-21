import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  @Input({ required: true }) public title!: string;
  @Input() public pageSession?: string;
  @Input() public showBackButton = false;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
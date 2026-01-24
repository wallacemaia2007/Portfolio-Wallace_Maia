import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface StatCard {
  value: string | number;
  label: string;
  suffix?: string;
  description?: string;
}

@Component({
  selector: 'app-stat-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-cards.component.html',
  styleUrl: './stat-cards.component.scss',
})
export class StatCardsComponent {
  @Input({ required: true }) stats: StatCard[] = [];
}

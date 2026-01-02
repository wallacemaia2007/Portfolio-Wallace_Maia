import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  CategoryInfo,
  ProjectCategory,
} from '../../../../models/project.model';

@Component({
  selector: 'app-project-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './project-filter.component.html',
  styleUrl: './project-filter.component.scss',
})
export class ProjectFilterComponent {
  @Input() totalProjects = 0;
  @Input() categories: CategoryInfo[] = [];

  @Output() categorySelected = new EventEmitter<ProjectCategory | 'all'>();
  @Output() searchTermChanged = new EventEmitter<string>();

  selectedCategory: ProjectCategory | 'all' = 'all';
  searchTerm = '';

  filterByCategory(category: ProjectCategory | 'all'): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

  onSearchChange(): void {
    this.searchTermChanged.emit(this.searchTerm);
  }
}

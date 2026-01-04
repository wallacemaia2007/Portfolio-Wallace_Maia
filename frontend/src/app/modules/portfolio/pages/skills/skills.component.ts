import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SkillCategoryComponent } from './components/skill-category/skill-category.component';
import { PortfolioService } from '../../services/portfolio.service';
import {
  Skill,
  SkillGroup,
  SkillCategoryType,
  SKILL_CATEGORY_NAMES,
  SKILL_CATEGORY_ICONS,
} from '../../models/skill.model';
import { ScrollRevealDirective } from "../../../shared/directives/scroll-reveal.directive";

interface CategoryInfo {
  type: SkillCategoryType | 'all';
  name: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    SectionHeaderComponent,
    SkillCategoryComponent,
    ScrollRevealDirective
],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  isLoading = true;
  allSkillGroups: SkillGroup[] = [];
  filteredSkillGroups: SkillGroup[] = [];
  selectedCategory: SkillCategoryType | 'all' = 'all';
  searchTerm = '';

  categories: CategoryInfo[] = [];
  totalSkills = 0;

  statistics: Array<{ value: number; label: string }> = [];

  ngOnInit(): void {
    this.loadSkills();
  }

  private loadSkills(): void {
    this.isLoading = true;

    this.portfolioService.getSkillsByCategory().subscribe({
      next: (skillsGrouped) => {
        this.allSkillGroups = Object.entries(skillsGrouped).map(
          ([category, skills]) => ({
            category: category as SkillCategoryType,
            categoryName:
              SKILL_CATEGORY_NAMES[category as SkillCategoryType] || category,
            icon: SKILL_CATEGORY_ICONS[category as SkillCategoryType],
            skills: skills,
          })
        );

        this.filteredSkillGroups = [...this.allSkillGroups];
        this.totalSkills = this.calculateTotalSkills();
        this.buildCategories();
        this.calculateStatistics();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar skills:', error);
        this.isLoading = false;
      },
    });
  }

  private calculateTotalSkills(): number {
    return this.allSkillGroups.reduce(
      (total, group) => total + group.skills.length,
      0
    );
  }

  private buildCategories(): void {
    this.categories = this.allSkillGroups.map((group) => ({
      type: group.category,
      name: group.categoryName,
      icon: group.icon || 'code',
      count: group.skills.length,
    }));
  }

  private calculateStatistics(): void {
    const allSkills = this.allSkillGroups.flatMap((group) => group.skills);

    const totalCategories = this.allSkillGroups.length;
    const expertSkills = allSkills.filter((skill) => skill.level === 5).length;
    const avgYearsExperience =
      allSkills.reduce(
        (sum, skill) => sum + (skill.yearsOfExperience || 0),
        0
      ) / allSkills.length;

    this.statistics = [
      { value: this.totalSkills, label: 'Habilidades' },
      { value: totalCategories, label: 'Categorias' },
      { value: expertSkills, label: 'Habilidades Expert' },
      {
        value: Math.round(avgYearsExperience),
        label: 'Anos de Experiência',
      },
    ];
  }

  filterByCategory(category: SkillCategoryType | 'all'): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.allSkillGroups];

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(
        (group) => group.category === this.selectedCategory
      );
    }

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered
        .map((group) => ({
          ...group,
          skills: group.skills.filter((skill) =>
            skill.name.toLowerCase().includes(searchLower)
          ),
        }))
        .filter((group) => group.skills.length > 0);
    }

    this.filteredSkillGroups = filtered;
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    this.filteredSkillGroups = [...this.allSkillGroups];
  }
}

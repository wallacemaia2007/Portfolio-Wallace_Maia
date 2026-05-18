import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SkillCategoryComponent } from './components/skill-category/skill-category.component';
import { SkillCardComponent } from './components/skill-card/skill-card.component';
import { PortfolioService } from '../../services/portfolio.service';
import { StatCardsComponent } from '../../../shared/components/stat-cards/stat-cards.component';
import {
  Skill,
  SkillGroup,
  SkillCategoryType,
  SKILL_CATEGORY_NAMES,
  SKILL_CATEGORY_NAMES_EN,
  SKILL_CATEGORY_ICONS,
} from '../../models/skill.model';
import { TranslateService } from '../../../../core/services/translate.service';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import {
  InformationBarComponent,
  InformationBarData,
} from '../../../shared/components/information-bar/information-bar.component';
import { SkillsBubbleSectionComponent } from './components/skills-bubble-section/skills-bubble-section.component';

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
    MatIconModule,
    MatButtonModule,
    SectionHeaderComponent,
    SkillCategoryComponent,
    SkillCardComponent,
    ScrollRevealDirective,
    InformationBarComponent,
    StatCardsComponent,
    SkillsBubbleSectionComponent,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  protected translate = inject(TranslateService);

  isLoading = true;
  allSkillGroups: SkillGroup[] = [];
  filteredSkillGroups: SkillGroup[] = [];
  searchResults: Skill[] = [];
  selectedCategory: SkillCategoryType | 'all' = 'all';
  searchTerm = '';

  categories: CategoryInfo[] = [];
  totalSkills = 0;

  statistics: Array<{ value: number; label: string }> = [];

  get isSearching(): boolean {
    return this.searchTerm.trim().length > 0;
  }

  get ctaData(): InformationBarData {
    return {
      title: this.translate.translate('skills.ctaTitle'),
      description: this.translate.translate('skills.ctaDescription'),
      buttons: [
        {
          label: this.translate.translate('skills.ctaProjectsButton'),
          icon: 'work',
          color: 'theme',
          link: '/projects',
        },
        {
          label: this.translate.translate('skills.ctaContactButton'),
          icon: 'email',
          color: 'theme',
          link: '/contact',
        },
      ],
    };
  }

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
              (this.translate.isEn() ? SKILL_CATEGORY_NAMES_EN : SKILL_CATEGORY_NAMES)[category as SkillCategoryType] || category,
            icon: SKILL_CATEGORY_ICONS[category as SkillCategoryType],
            skills: skills,
          }),
        );

        this.filteredSkillGroups = [...this.allSkillGroups];
        this.totalSkills = this.calculateTotalSkills();
        this.buildCategories();
        this.calculateStatistics();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.isLoading = false;
      },
    });
  }

  private calculateTotalSkills(): number {
    return this.allSkillGroups.reduce(
      (total, group) => total + group.skills.length,
      0,
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
        0,
      ) / allSkills.length;

    this.statistics = [
      { value: this.totalSkills, label: this.translate.translate('skills.statsSkills') },
      { value: totalCategories, label: 'Categorias' },
      {
        value: Math.round(avgYearsExperience),
        label: this.translate.translate('skills.statsExperience'),
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
        (group) => group.category === this.selectedCategory,
      );
    }

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      this.searchResults = filtered
        .flatMap((group) => group.skills)
        .filter((skill) => skill.name.toLowerCase().includes(searchLower));
      return;
    }

    this.searchResults = [];
    this.filteredSkillGroups = filtered;
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    this.searchResults = [];
    this.filteredSkillGroups = [...this.allSkillGroups];
  }
}

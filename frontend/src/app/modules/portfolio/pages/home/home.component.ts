import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroSectionComponent } from '../../../shared/components/hero-section/hero-section.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SocialLinksComponent } from '../../../shared/components/social-links/social-links.component';
import { ProjectCardComponent } from '../projects/components/project-card/project-card.component';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/project.model';
import {
  SkillGroup,
  SKILL_CATEGORY_ICONS,
  SKILL_CATEGORY_NAMES,
  SkillCategoryType,
} from '../../models/skill.model';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    HeroSectionComponent,
    SectionHeaderComponent,
    SocialLinksComponent,
    ProjectCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  // Featured Projects
  featuredProjects: Project[] = [];
  isLoadingProjects = true;

  // Skills
  skillCategories: SkillGroup[] = [];
  isLoadingSkills = true;

  // Experience
  recentExperiences: Experience[] = [];
  isLoadingExperience = true;

  // Statistics
  statistics: Array<{ value: string; label: string; suffix?: string }> = [];

  ngOnInit(): void {
    this.loadFeaturedProjects();
    this.loadSkillsOverview();
    this.loadRecentExperience();
    this.loadStatistics();
  }

  /**
   * Carrega projetos em destaque (máximo 3)
   */
  private loadFeaturedProjects(): void {
    this.isLoadingProjects = true;
    this.portfolioService.getFeaturedProjects().subscribe({
      next: (projects) => {
        this.featuredProjects = projects.slice(0, 3);
        this.isLoadingProjects = false;
      },
      error: (error) => {
        console.error('Erro ao carregar projetos em destaque:', error);
        this.isLoadingProjects = false;
      },
    });
  }

  /**
   * Carrega overview de skills agrupadas por categoria
   */
  private loadSkillsOverview(): void {
    this.isLoadingSkills = true;
    this.portfolioService.getSkillsByCategory().subscribe({
      next: (skillsGrouped) => {
        this.skillCategories = Object.entries(skillsGrouped).map(
          ([category, skills]) => ({
            category: category as any,
            categoryName:
              SKILL_CATEGORY_NAMES[category as SkillCategoryType] || category,
            icon: SKILL_CATEGORY_ICONS[category as SkillCategoryType],
            skills: skills,
          })
        );
        this.isLoadingSkills = false;
      },
      error: (error) => {
        console.error('Erro ao carregar skills:', error);
        this.isLoadingSkills = false;
      },
    });
  }

  /**
   * Carrega experiências mais recentes (máximo 3)
   */
  private loadRecentExperience(): void {
    this.isLoadingExperience = true;
    this.portfolioService.getExperience().subscribe({
      next: (experiences) => {
        this.recentExperiences = experiences.slice(0, 3);
        this.isLoadingExperience = false;
      },
      error: (error) => {
        console.error('Erro ao carregar experiências:', error);
        this.isLoadingExperience = false;
      },
    });
  }

  /**
   * Carrega estatísticas do portfólio
   */
  private loadStatistics(): void {
    this.portfolioService.getStatistics().subscribe({
      next: (stats) => {
        this.statistics = [
          {
            value: stats.completedProjects.toString(),
            label: 'Projetos Concluídos',
          },
          {
            value: stats.yearsExperience.toString(),
            label: 'Anos de Experiência',
            suffix: '+',
          },
          {
            value: stats.technologies.toString(),
            label: 'Tecnologias',
            suffix: '+',
          },
          {
            value: stats.happyClients.toString(),
            label: 'Clientes Satisfeitos',
            suffix: '+',
          },
        ];
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
        // Fallback com valores padrão
        this.statistics = [
          { value: '0', label: 'Projetos Concluídos' },
          { value: '0', label: 'Anos de Experiência', suffix: '+' },
          { value: '0', label: 'Tecnologias', suffix: '+' },
          { value: '0', label: 'Clientes Satisfeitos', suffix: '+' },
        ];
      },
    });
  }
}

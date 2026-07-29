import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { ProjectFilterComponent } from './components/project-filter/project-filter.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { PortfolioService } from '../../services/portfolio.service';
import {
  Project,
  ProjectCategory,
  PROJECT_CATEGORY_NAMES,
  PROJECT_CATEGORY_NAMES_EN,
} from '../../models/project.model';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import {
  InformationBarComponent,
  InformationBarData,
} from '../../../shared/components/information-bar/information-bar.component';
import { StatCardsComponent } from '../../../shared/components/stat-cards/stat-cards.component';
import { LangTextPipe } from '../../../shared/pipes/lang-text.pipe';
import { TranslateService } from '../../../../core/services/translate.service';

interface CategoryInfo {
  value: ProjectCategory | 'all';
  label: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ProjectModalComponent,
    ProjectFilterComponent,
    ProjectCardComponent,
    SectionHeaderComponent,
    ScrollRevealDirective,
    InformationBarComponent,
    StatCardsComponent,
    LangTextPipe,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  protected translate = inject(TranslateService);
  private playingPreviewIds = new Set<string>();
  private readonly projectGridPreference = new Map<string, number>(
    [
      'split-hub',
      'portfolio-marcio-carvalho',
      'schulles-gastronomia-erp',
      'instituto-motiro',
      'personal-portfolio',
      'dev-landing-page',
    ].map((slug, index) => [slug, index]),
  );

  isLoading = true;
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];

  latestCompletedProject: Project | null = null;

  selectedProject: Project | null = null;

  selectedCategory: ProjectCategory | 'all' = 'all';
  searchTerm = '';
  totalProjects = 0;
  categories: CategoryInfo[] = [];
  statistics: Array<{ value: number; label: string }> = [];

  get ctaData(): InformationBarData {
    return {
      title: this.translate.translate('projects.ctaTitle'),
      description: this.translate.translate('projects.ctaDescription'),
      buttons: [
        {
          label: this.translate.translate('projects.ctaSkillsButton'),
          icon: 'work',
          color: 'theme',
          link: '/skills',
        },
        {
          label: this.translate.translate('projects.ctaContactButton'),
          icon: 'email',
          color: 'theme',
          link: '/contact',
        },
      ],
    };
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.isLoading = true;

    this.portfolioService.getProjects().subscribe({
      next: (projects) => {
        this.allProjects = projects;
        this.filteredProjects = this.sortProjectsForGrid(projects);
        this.totalProjects = projects.length;

        this.buildCategories();
        this.findLatestCompletedProject();
        this.statistics = [
          {
            value: this.totalProjects,
            label: this.translate.translate('projects.statsProjects'),
          },
          { value: this.categories.length, label: 'Categorias' },
          {
            value: this.getTechnologiesCount(),
            label: this.translate.translate('projects.statsTechnologies'),
          },
        ];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading = false;
      },
    });
  }

  private buildCategories(): void {
    const categoryCounts = new Map<ProjectCategory, number>();

    this.allProjects.forEach((project) => {
      const count = categoryCounts.get(project.category) || 0;
      categoryCounts.set(project.category, count + 1);
    });

    const catNames = this.translate.isEn()
      ? PROJECT_CATEGORY_NAMES_EN
      : PROJECT_CATEGORY_NAMES;
    this.categories = Array.from(categoryCounts.entries()).map(
      ([category, count]) => ({
        value: category,
        label: catNames[category],
        icon: this.getCategoryIcon(category),
        count,
      }),
    );

    this.categories.sort((a, b) => b.count - a.count);
  }

  private findLatestCompletedProject(): void {
    const completedProjects = [...this.allProjects];

    if (completedProjects.length === 0) {
      this.latestCompletedProject = null;
      return;
    }

    const sortedProjects = completedProjects.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateB - dateA;
    });

    this.latestCompletedProject = sortedProjects[0];
  }

  openProjectModal(project: Project): void {
    this.selectedProject = project;
  }

  closeProjectModal(): void {
    this.selectedProject = null;
  }

  onCategorySelected(category: ProjectCategory | 'all'): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearchTermChanged(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.allProjects];

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === this.selectedCategory);
    }

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.shortDescription.toLowerCase().includes(searchLower) ||
          p.technologies.some((t) => t.toLowerCase().includes(searchLower)) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      );
    }

    this.filteredProjects = this.sortProjectsForGrid(filtered);
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    this.filteredProjects = this.sortProjectsForGrid(this.allProjects);
  }

  private sortProjectsForGrid(projects: Project[]): Project[] {
    return projects
      .map((project, index) => ({ project, index }))
      .sort((a, b) => {
        const priorityA = this.projectGridPreference.get(a.project.slug);
        const priorityB = this.projectGridPreference.get(b.project.slug);
        const rankA = priorityA ?? Number.MAX_SAFE_INTEGER;
        const rankB = priorityB ?? Number.MAX_SAFE_INTEGER;

        if (rankA !== rankB) {
          return rankA - rankB;
        }

        return a.index - b.index;
      })
      .map(({ project }) => project);
  }

  getTechnologiesCount(): number {
    const allTechs = this.allProjects.flatMap((p) => p.technologies);
    const unique = new Set(allTechs);
    return unique.size;
  }

  getCategoryLabel(category: ProjectCategory): string {
    return this.translate.isEn()
      ? PROJECT_CATEGORY_NAMES_EN[category]
      : PROJECT_CATEGORY_NAMES[category];
  }

  getCategoryIcon(category: ProjectCategory): string {
    const icons: Record<ProjectCategory, string> = {
      web: 'language',
      mobile: 'phone_android',
      desktop: 'computer',
      backend: 'dns',
      frontend: 'web',
      other: 'more_horiz',
    };
    return icons[category];
  }

  getStatusClass(status: string): string {
    const statusClasses: Record<string, string> = {
      completed: 'bg-accent text-white',
      'in-progress': 'bg-blue-500 text-white',
      planned: 'bg-yellow-500 text-white',
      paused: 'bg-gray-500 text-white',
    };
    return statusClasses[status] || 'bg-gray-500 text-white';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      completed: 'projects.statusCompleted',
      'in-progress': 'projects.statusInProgress',
      planned: 'projects.statusPlanned',
      paused: 'projects.statusPaused',
    };
    return this.translate.translate(map[status] || status);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.translate.isEn() ? 'en-US' : 'pt-BR', {
      month: 'short',
      year: 'numeric',
    });
  }

  isProjectPreviewPlaying(projectId: string): boolean {
    return this.playingPreviewIds.has(projectId);
  }

  onProjectCardEnter(project: Project, video: HTMLVideoElement): void {
    if (!project.thumbVideo) {
      return;
    }

    this.playingPreviewIds.add(project.id);
    video.currentTime = 0;
    void video.play().catch(() => {
      this.playingPreviewIds.delete(project.id);
    });
  }

  onProjectCardLeave(project: Project, video: HTMLVideoElement): void {
    this.resetProjectPreview(project, video);
  }

  onProjectPreviewEnded(project: Project, video: HTMLVideoElement): void {
    this.resetProjectPreview(project, video);
  }

  private resetProjectPreview(project: Project, video: HTMLVideoElement): void {
    this.playingPreviewIds.delete(project.id);
    video.pause();
    video.currentTime = 0;
  }
}

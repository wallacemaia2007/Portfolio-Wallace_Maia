import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import {
  BlogPost,
  Project,
  Statistics,
  Testimonial,
} from '../models/project.model';
import { Skill } from '../models/skill.model';
import { Experience } from '../models/experience.model';
import { PersonalInfo } from '../models/personal-info.model';
import { AboutInfo } from '../models/about.model';
import { environment } from '../../../../environments/environment';
import { SocialLink } from '../models/social-link.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // ============================================
  // PERSONAL INFO
  // ============================================

  /**
   * Retorna informações pessoais
   */
  getPersonalInfo(): Observable<PersonalInfo> {
    return this.http.get<PersonalInfo>(`${this.apiUrl}/personalInfo`);
  }

  getSocialLinks(): Observable<SocialLink[]> {
    return this.http.get<SocialLink[]>(`${this.apiUrl}/socialLinks`);
  }

  /**
   * Atualiza informações pessoais
   */
  updatePersonalInfo(info: PersonalInfo): Observable<PersonalInfo> {
    return this.http.put<PersonalInfo>(`${this.apiUrl}/personalInfo`, info);
  }

  // ============================================
  // PROJECTS
  // ============================================

  /**
   * Retorna todos os projetos
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  /**
   * Retorna apenas projetos em destaque
   */
  getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects?featured=true`);
  }

  /**
   * Retorna um projeto específico por ID
   */
  getProjectById(id: string): Observable<Project | undefined> {
    return this.http
      .get<Project>(`${this.apiUrl}/projects/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  /**
   * Retorna um projeto por slug
   */
  getProjectBySlug(slug: string): Observable<Project | undefined> {
    return this.http
      .get<Project[]>(`${this.apiUrl}/projects?slug=${slug}`)
      .pipe(
        map((projects) => projects[0]),
        catchError(() => of(undefined))
      );
  }

  /**
   * Filtra projetos por categoria
   */
  getProjectsByCategory(category: string): Observable<Project[]> {
    return this.http.get<Project[]>(
      `${this.apiUrl}/projects?category=${category}`
    );
  }

  /**
   * Filtra projetos por tecnologia
   */
  getProjectsByTechnology(technology: string): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${this.apiUrl}/projects`)
      .pipe(
        map((projects) =>
          projects.filter((p) =>
            p.technologies.some((t) =>
              t.toLowerCase().includes(technology.toLowerCase())
            )
          )
        )
      );
  }

  /**
   * Busca projetos por termo (client-side search)
   * JSON Server não tem full-text search nativo
   */
  searchProjects(searchTerm: string): Observable<Project[]> {
    const term = searchTerm.toLowerCase();

    return this.http
      .get<Project[]>(`${this.apiUrl}/projects`)
      .pipe(
        map((projects) =>
          projects.filter(
            (p) =>
              p.title.toLowerCase().includes(term) ||
              p.description.toLowerCase().includes(term) ||
              p.shortDescription.toLowerCase().includes(term) ||
              p.technologies.some((t) => t.toLowerCase().includes(term)) ||
              p.tags.some((tag) => tag.toLowerCase().includes(term))
          )
        )
      );
  }

  /**
   * Filtra projetos com múltiplos critérios
   * Combina filtros do server e client-side
   */
  filterProjects(filters: {
    category?: string;
    technology?: string;
    search?: string;
    featured?: boolean;
    status?: string;
    clientType?: string;
  }): Observable<Project[]> {
    // Monta query params para filtros que JSON Server suporta nativamente
    const params: any = {};

    if (filters.category && filters.category !== 'all') {
      params.category = filters.category;
    }

    if (filters.featured !== undefined) {
      params.featured = filters.featured;
    }

    if (filters.status) {
      params.status = filters.status;
    }

    if (filters.clientType) {
      params.clientType = filters.clientType;
    }

    // Faz request com filtros do servidor
    return this.http.get<Project[]>(`${this.apiUrl}/projects`, { params }).pipe(
      map((projects) => {
        let filtered = projects;

        // Aplica filtros client-side (que JSON Server não suporta nativamente)
        if (filters.technology) {
          filtered = filtered.filter((p) =>
            p.technologies.some((t) =>
              t.toLowerCase().includes(filters.technology!.toLowerCase())
            )
          );
        }

        if (filters.search) {
          const term = filters.search.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.title.toLowerCase().includes(term) ||
              p.description.toLowerCase().includes(term) ||
              p.shortDescription.toLowerCase().includes(term)
          );
        }

        return filtered;
      })
    );
  }

  /**
   * Cria novo projeto (se precisar de admin)
   */
  createProject(project: Omit<Project, 'id'>): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project);
  }

  /**
   * Atualiza projeto
   */
  updateProject(id: string, project: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/projects/${id}`, project);
  }

  /**
   * Deleta projeto
   */
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${id}`);
  }

  // ============================================
  // SKILLS
  // ============================================

  /**
   * Retorna todas as skills
   */
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`);
  }

  /**
   * Retorna skills organizadas por categoria
   */
  getSkillsByCategory(): Observable<{ [category: string]: Skill[] }> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`).pipe(
      map((skills) => {
        const grouped: { [category: string]: Skill[] } = {};

        skills.forEach((skill) => {
          if (!grouped[skill.category]) {
            grouped[skill.category] = [];
          }
          grouped[skill.category].push(skill);
        });

        return grouped;
      })
    );
  }

  /**
   * Retorna skills de uma categoria específica
   */
  getSkillsByCategoryName(category: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills?category=${category}`);
  }

  /**
   * Retorna todas as tecnologias únicas (para filtros)
   */
  getAllTechnologies(): Observable<string[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      map((projects) => {
        const allTechs = projects
          .flatMap((p) => p.technologies)
          .filter((tech, index, self) => self.indexOf(tech) === index)
          .sort();
        return allTechs;
      })
    );
  }

  // ============================================
  // EXPERIENCE
  // ============================================

  /**
   * Retorna todas as experiências profissionais (ordenadas por data)
   */
  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(
      `${this.apiUrl}/experience?_sort=startDate&_order=desc`
    );
  }

  /**
   * Retorna experiência atual (se houver)
   */
  getCurrentExperience(): Observable<Experience | undefined> {
    return this.http
      .get<Experience[]>(`${this.apiUrl}/experience?current=true`)
      .pipe(
        map((experiences) => experiences[0]),
        catchError(() => of(undefined))
      );
  }

  /**
   * Retorna experiências por tipo
   */
  getExperienceByType(type: Experience['type']): Observable<Experience[]> {
    return this.http.get<Experience[]>(
      `${this.apiUrl}/experience?type=${type}`
    );
  }

  /**
   * Retorna experiência por ID
   */
  getExperienceById(id: string): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/experience/${id}`);
  }

  // ============================================
  // TESTIMONIALS (DEPOIMENTOS)
  // ============================================

  /**
   * Retorna todos os depoimentos
   */
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`);
  }

  /**
   * Retorna depoimentos com nota específica
   */
  getTestimonialsByRating(rating: number): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(
      `${this.apiUrl}/testimonials?rating=${rating}`
    );
  }

  // ============================================
  // BLOG (OPCIONAL)
  // ============================================

  /**
   * Retorna todos os posts do blog
   */
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(
      `${this.apiUrl}/blog?_sort=publishedAt&_order=desc`
    );
  }

  /**
   * Retorna posts em destaque
   */
  getFeaturedBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(
      `${this.apiUrl}/blog?featured=true&_sort=publishedAt&_order=desc`
    );
  }

  /**
   * Retorna post por slug
   */
  getBlogPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/blog?slug=${slug}`).pipe(
      map((posts) => posts[0]),
      catchError(() => of(undefined))
    );
  }

  /**
   * Retorna posts por categoria
   */
  getBlogPostsByCategory(category: string): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(
      `${this.apiUrl}/blog?category=${category}&_sort=publishedAt&_order=desc`
    );
  }

  /**
   * Incrementa visualizações de um post
   */
  incrementBlogPostViews(id: string): Observable<BlogPost> {
    return this.getBlogPostById(id).pipe(
      map((post) => {
        const updatedPost = { ...post, views: post.views + 1 };
        this.http
          .patch(`${this.apiUrl}/blog/${id}`, { views: updatedPost.views })
          .subscribe();
        return updatedPost;
      })
    );
  }

  private getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/blog/${id}`);
  }

  // ============================================
  // STATISTICS
  // ============================================

  /**
   * Retorna estatísticas do portfolio
   */
  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.apiUrl}/statistics`);
  }

  /**
   * Calcula estatísticas em tempo real (alternativa)
   */
  calculateStatistics(): Observable<Statistics> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      map((projects) => ({
        totalProjects: projects.length,
        completedProjects: projects.filter((p) => p.status === 'completed')
          .length,
        happyClients: 30, // Pode ser calculado de testimonials
        yearsExperience: this.calculateYearsOfExperience(),
        technologies: this.countUniqueTechnologies(projects),
        coffeesCups: 9999, // Easter egg :)
      }))
    );
  }

  private calculateYearsOfExperience(): number {
    // Baseado na primeira experiência profissional
    // Você pode ajustar essa lógica
    const firstJobYear = 2018; // Ou buscar do endpoint de experience
    return new Date().getFullYear() - firstJobYear;
  }

  private countUniqueTechnologies(projects: Project[]): number {
    const allTechs = projects.flatMap((p) => p.technologies);
    const unique = new Set(allTechs);
    return unique.size;
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  /**
   * Retorna categorias de projetos disponíveis
   */
  getProjectCategories(): Observable<string[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      map((projects) => {
        const categories = [...new Set(projects.map((p) => p.category))];
        return categories.sort();
      })
    );
  }

  /**
   * Valida se um projeto existe
   */
  projectExists(id: string): Observable<boolean> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Busca global (projetos, skills, experiências)
   */
  globalSearch(term: string): Observable<{
    projects: Project[];
    skills: Skill[];
    experiences: Experience[];
  }> {
    const searchTerm = term.toLowerCase();

    return this.http
      .get<{
        projects: Project[];
        skills: Skill[];
        experience: Experience[];
      }>(`${this.apiUrl}/db`)
      .pipe(
        // Endpoint especial do JSON Server que retorna tudo
        map((data) => ({
          projects: data.projects.filter(
            (p) =>
              p.title.toLowerCase().includes(searchTerm) ||
              p.description.toLowerCase().includes(searchTerm)
          ),
          skills: data.skills.filter((s) =>
            s.name.toLowerCase().includes(searchTerm)
          ),
          experiences: data.experience.filter(
            (e) =>
              e.company.toLowerCase().includes(searchTerm) ||
              e.position.toLowerCase().includes(searchTerm)
          ),
        }))
      );
  }

  // ============================================
  // PAGINATION SUPPORT
  // ============================================

  /**
   * Retorna projetos paginados
   * JSON Server suporta paginação com _page e _limit
   */
  getProjectsPaginated(
    page: number = 1,
    limit: number = 10
  ): Observable<{
    data: Project[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    return this.http
      .get<Project[]>(`${this.apiUrl}/projects?_page=${page}&_limit=${limit}`, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const total = parseInt(
            response.headers.get('X-Total-Count') || '0',
            10
          );
          return {
            data: response.body || [],
            total,
            page,
            totalPages: Math.ceil(total / limit),
          };
        })
      );
  }

  /**
   * Retorna posts do blog paginados
   */
  getBlogPostsPaginated(
    page: number = 1,
    limit: number = 10
  ): Observable<{
    data: BlogPost[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    return this.http
      .get<BlogPost[]>(
        `${this.apiUrl}/blog?_page=${page}&_limit=${limit}&_sort=publishedAt&_order=desc`,
        { observe: 'response' }
      )
      .pipe(
        map((response) => {
          const total = parseInt(
            response.headers.get('X-Total-Count') || '0',
            10
          );
          return {
            data: response.body || [],
            total,
            page,
            totalPages: Math.ceil(total / limit),
          };
        })
      );
  }

  getAboutInfo(): Observable<AboutInfo> {
    return this.http.get<AboutInfo>(`${this.apiUrl}/about`)
  }

}

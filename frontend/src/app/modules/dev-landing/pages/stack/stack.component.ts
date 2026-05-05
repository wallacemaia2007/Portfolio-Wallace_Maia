import {
  Component,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

interface SkillData {
  id: string;
  name: string;
  category: string;
  level: number;
  yearsOfExperience: number;
  icon: string;
  color: string;
}

interface SkillTab {
  key: string;
  label: string;
}

interface LevelBadge {
  label: string;
  cssClass: string;
}

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ScrollRevealDirective,
    SectionHeaderComponent,
  ],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss',
})
export class StackComponent implements OnDestroy {
  activeCategory = 'frontend';

  readonly tabs: SkillTab[] = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'database', label: 'Database' },
    { key: 'tools', label: 'Ferramentas' },
  ];

  readonly allSkills: SkillData[] = [
    { id: '1', name: 'Angular', category: 'frontend', level: 5, yearsOfExperience: 1, icon: 'assets/icons/angular.svg', color: '#DD0031' },
    { id: '3', name: 'TypeScript', category: 'frontend', level: 5, yearsOfExperience: 1, icon: 'assets/icons/typescript.svg', color: '#3178C6' },
    { id: '4', name: 'JavaScript', category: 'frontend', level: 4, yearsOfExperience: 2, icon: 'assets/icons/javascript.svg', color: '#F7DF1E' },
    { id: '5', name: 'HTML5', category: 'frontend', level: 5, yearsOfExperience: 2, icon: 'assets/icons/html5.svg', color: '#E34F26' },
    { id: '6', name: 'CSS3', category: 'frontend', level: 5, yearsOfExperience: 2, icon: 'assets/icons/css3.svg', color: '#1572B6' },
    { id: '7', name: 'Tailwind CSS', category: 'frontend', level: 5, yearsOfExperience: 1, icon: 'assets/icons/tailwind.svg', color: '#06B6D4' },
    { id: '21', name: 'OAuth', category: 'frontend', level: 4, yearsOfExperience: 1, icon: 'assets/icons/oauth.svg', color: '#8A2BE2' },
    { id: '22', name: 'RxJS', category: 'frontend', level: 5, yearsOfExperience: 1, icon: 'assets/icons/rxjs.svg', color: '#8A2BE2' },
    { id: '28', name: 'Angular Material', category: 'frontend', level: 5, yearsOfExperience: 2, icon: 'assets/icons/angularMaterial.svg', color: '#8A2BE2' },
    { id: '30', name: 'PrimeNG', category: 'frontend', level: 5, yearsOfExperience: 2, icon: 'assets/icons/primeng.svg', color: '#8A2BE2' },
    { id: '31', name: 'Vite', category: 'frontend', level: 5, yearsOfExperience: 1, icon: 'assets/icons/vite.svg', color: '#8A2BE2' },
    { id: '2', name: 'Java', category: 'backend', level: 5, yearsOfExperience: 2, icon: 'assets/icons/java.svg', color: '#61DAFB' },
    { id: '8', name: 'Spring Boot', category: 'backend', level: 5, yearsOfExperience: 2, icon: 'assets/icons/spring.svg', color: '#339933' },
    { id: '9', name: 'Spring Security', category: 'backend', level: 4, yearsOfExperience: 1, icon: 'assets/icons/springSecurity.svg', color: '#6DB33F' },
    { id: '19', name: 'JUnit', category: 'backend', level: 5, yearsOfExperience: 2, icon: 'assets/icons/junit.svg', color: '#25A162' },
    { id: '20', name: 'Mockito', category: 'backend', level: 5, yearsOfExperience: 2, icon: 'assets/icons/mockito.svg', color: '#8A2BE2' },
    { id: '23', name: 'Node.js', category: 'backend', level: 3, yearsOfExperience: 1, icon: 'assets/icons/nodejs.svg', color: '#8A2BE2' },
    { id: '24', name: 'Express', category: 'backend', level: 3, yearsOfExperience: 1, icon: 'assets/icons/express.svg', color: '#8A2BE2' },
    { id: '26', name: 'Spring Data JPA', category: 'backend', level: 5, yearsOfExperience: 2, icon: 'assets/icons/springDataJPA.svg', color: '#8A2BE2' },
    { id: '10', name: 'MongoDB', category: 'database', level: 4, yearsOfExperience: 2, icon: 'assets/icons/mongodb.svg', color: '#47A248' },
    { id: '11', name: 'PostgreSQL', category: 'database', level: 4, yearsOfExperience: 2, icon: 'assets/icons/postgresql.svg', color: '#4169E1' },
    { id: '12', name: 'MySQL', category: 'database', level: 5, yearsOfExperience: 2, icon: 'assets/icons/mysql.svg', color: '#FFCA28' },
    { id: '13', name: 'Git', category: 'tools', level: 5, yearsOfExperience: 2, icon: 'assets/icons/git.svg', color: '#F05032' },
    { id: '14', name: 'Docker', category: 'tools', level: 3, yearsOfExperience: 1, icon: 'assets/icons/docker.svg', color: '#2496ED' },
    { id: '15', name: 'AWS', category: 'tools', level: 3, yearsOfExperience: 1, icon: 'assets/icons/aws.svg', color: '#FF9900' },
    { id: '16', name: 'Figma', category: 'tools', level: 4, yearsOfExperience: 1, icon: 'assets/icons/figma.svg', color: '#F24E1E' },
    { id: '17', name: 'Postman', category: 'tools', level: 4, yearsOfExperience: 2, icon: 'assets/icons/postman.svg', color: '#FF6C37' },
    { id: '18', name: 'Swagger', category: 'tools', level: 4, yearsOfExperience: 2, icon: 'assets/icons/swagger.svg', color: '#85EA2D' },
    { id: '25', name: 'Json-Server', category: 'tools', level: 4, yearsOfExperience: 1, icon: 'assets/icons/json.svg', color: '#8A2BE2' },
    { id: '27', name: 'GitHub', category: 'tools', level: 5, yearsOfExperience: 2, icon: 'assets/icons/github.svg', color: '#8A2BE2' },
    { id: '29', name: 'Linux', category: 'tools', level: 5, yearsOfExperience: 2, icon: 'assets/icons/linux.svg', color: '#8A2BE2' },
  ];

  private intersectionObserver?: IntersectionObserver;

  readonly levelBadges: Record<number, LevelBadge> = {
    1: { label: 'Iniciante', cssClass: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
    2: { label: 'Basico', cssClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
    3: { label: 'Intermediario', cssClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300' },
    4: { label: 'Avancado', cssClass: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
    5: { label: 'Expert', cssClass: 'bg-dev/15 text-dev dark:bg-dev/25 dark:text-dev-light' },
  };

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    setTimeout(() => this.setupProgressBarObserver(), 100);
  }

  getActiveSkills(): SkillData[] {
    return this.allSkills.filter(s => s.category === this.activeCategory);
  }

  getProgressWidth(level: number): number {
    return level * 20;
  }

  getLevelBadge(level: number): LevelBadge {
    return this.levelBadges[level] || this.levelBadges[1];
  }

  getProgressColor(level: number): string {
    if (level >= 5) return 'bg-dev dark:bg-dev-light';
    if (level >= 4) return 'bg-accent dark:bg-accent-light';
    if (level >= 3) return 'bg-yellow-500';
    if (level >= 2) return 'bg-blue-500';
    return 'bg-gray-400';
  }

  onIconError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/icons/code.svg';
  }

  setupProgressBarObserver(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.skill-progress-fill') as HTMLElement;
            if (bar) {
              const targetWidth = bar.getAttribute('data-width');
              if (targetWidth) {
                requestAnimationFrame(() => {
                  bar.style.width = targetWidth;
                });
              }
            }
            this.intersectionObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    setTimeout(() => {
      const cards = document.querySelectorAll('.skill-card-item');
      cards.forEach((card) => {
        this.intersectionObserver?.observe(card);
      });
    }, 50);
  }
}

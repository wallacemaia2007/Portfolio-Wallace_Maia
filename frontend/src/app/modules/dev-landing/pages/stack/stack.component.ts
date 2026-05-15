import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { Subscription } from 'rxjs';
import { gsap } from '../../../../core/gsap-register';

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
export class StackComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stackSection', { static: true })
  stackSection!: ElementRef<HTMLElement>;

  @ViewChild('terminalContainer')
  terminalContainer!: ElementRef<HTMLElement>;

  @ViewChildren('stackCard')
  stackCards!: QueryList<ElementRef<HTMLElement>>;

  private platformId = inject(PLATFORM_ID);
  private ctx?: gsap.Context;
  private prefersReducedMotion = false;
  private isMobile = false;
  private stackCardsSub?: Subscription;
  private terminalLines: HTMLElement[] = [];
  private terminalLoopId?: any;

  activeCategory = 'frontend';

  private readonly codeSnippets = [
    'git commit -m "feat: implement neural network background"',
    'npm install @angular/core gsap tailwindcss',
    'const brain = new NeuralNetwork({ layers: [64, 32, 16] });',
    'brain.train(trainingData, { iterations: 2500 });',
    'import { Component, AfterViewInit } from "@angular/core";',
    'export class StackComponent implements AfterViewInit { ... }',
    'gsap.to(".terminal-line", { opacity: 1, duration: 0.5, stagger: 0.1 });',
    'SELECT * FROM skills WHERE level >= 4 ORDER BY experience DESC;',
    'docker-compose up -d --build --force-recreate',
    'mvn clean install -DskipTests -Pproduction',
    'public class SpringBootApp { public static void main(String[] args) }',
    'fetch("/api/v1/projects").then(res => res.json()).then(render);',
    'const [skills, setSkills] = useState([]);',
    'kubectl apply -f k8s/deployment.yaml',
    '// Optimizing rendering performance for high-load apps...',
    'if (network.isStable()) { syncDatabaseState(); }',
    'console.log("%cWelcome to my Portfolio!", "color: #3b82f6; font-weight: bold;");',
    'git push origin main --force-with-lease',
    'sudo apt-get update && sudo apt-get upgrade -y',
    'const observer = new IntersectionObserver(entries => { ... });',
    'export interface Skill { id: string; name: string; level: number; }',
    'const data$ = this.http.get<Skill[]>("/api/skills").pipe(shareReplay(1));',
    'systemctl restart nginx.service && tail -f /var/log/nginx/access.log',
    'ssh -i ~/.ssh/id_rsa.pem ubuntu@api.manus.im'
  ];

  readonly frontendMain: Pick<SkillData, 'id' | 'name' | 'icon'>[] = [
    { id: '1', name: 'Angular', icon: 'assets/icons/angular.svg' },
    { id: '3', name: 'TypeScript', icon: 'assets/icons/typescript.svg' },
    { id: '7', name: 'Tailwind CSS', icon: 'assets/icons/tailwind.svg' },
    { id: '22', name: 'RxJS', icon: 'assets/icons/rxjs.svg' },
  ];

  readonly backendMain: Pick<SkillData, 'id' | 'name' | 'icon'>[] = [
    { id: '2', name: 'Java', icon: 'assets/icons/java.svg' },
    { id: '8', name: 'Spring Boot', icon: 'assets/icons/spring.svg' },
    { id: '23', name: 'Node.js', icon: 'assets/icons/nodejs.svg' },
    { id: '24', name: 'Express', icon: 'assets/icons/express.svg' },
  ];

  readonly frontendTraits: string[] = ['Reativo', 'Componentizado', 'Performático', 'Tipado'];
  readonly backendTraits: string[] = ['Robusto', 'Seguro', 'Escalável', 'REST & JWT'];

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

  constructor(private readonly ngZone: NgZone) {}

  readonly levelBadges: Record<number, LevelBadge> = {
    1: { label: 'Iniciante', cssClass: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
    2: { label: 'Basico', cssClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
    3: { label: 'Intermediario', cssClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300' },
    4: { label: 'Avancado', cssClass: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
    5: { label: 'Expert', cssClass: 'bg-blue-500/15 text-blue-500 dark:bg-blue-500/25 dark:text-blue-400' },
  };

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth < 768;

    this.stackCardsSub = this.stackCards.changes.subscribe(() => {
      this.setupProgressBarObserver();
    });

    this.ngZone.runOutsideAngular(() => {
      this.initAnimations();
      if (!this.prefersReducedMotion) {
        this.startTerminalLoop();
      }
    });

    this.setupProgressBarObserver();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    if (this.stackCardsSub) this.stackCardsSub.unsubscribe();
    if (this.ctx) this.ctx.revert();
    if (this.terminalLoopId) clearTimeout(this.terminalLoopId);
  }

  setFocusedStack(category: string): void {
    this.setActiveCategory(category);
    setTimeout(() => {
      const tabsEl = document.querySelector('#stack .mt-20');
      tabsEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    setTimeout(() => this.setupProgressBarObserver(), 100);
  }

  getActiveSkills(): SkillData[] {
    return this.allSkills.filter((s) => s.category === this.activeCategory);
  }

  getLevelBadge(level: number): LevelBadge {
    return this.levelBadges[level] || this.levelBadges[1];
  }

  onIconError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/icons/code.svg';
  }

  setupProgressBarObserver(): void {
    if (this.intersectionObserver) this.intersectionObserver.disconnect();

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
      { threshold: 0.1 },
    );

    const cards = document.querySelectorAll('.skill-card-item');
    cards.forEach((card) => this.intersectionObserver?.observe(card));
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {
      if (this.terminalContainer) {
        gsap.to(this.terminalContainer.nativeElement, {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: this.stackSection.nativeElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      }
    }, this.stackSection.nativeElement);
  }

  private startTerminalLoop(): void {
    const container = this.terminalContainer?.nativeElement;
    if (!container) return;

    const addLine = () => {
      const snippet = this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)];
      const line = document.createElement('div');
      line.className = 'terminal-line flex items-center gap-2 mb-1 opacity-0 translate-x-[-10px]';
      
      const highlighted = snippet
        .replace(/(const|let|var|import|export|class|public|static|return|if|else|SELECT|FROM|WHERE|LIMIT|git|npm|mvn|docker|kubectl|sudo|systemctl|ssh)/g, '<span class="keyword">$1</span>')
        .replace(/("[^"]*"|'[^']*')/g, '<span class="string">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
      
      line.innerHTML = `<span class="prompt">➜</span>${highlighted}`;
      container.appendChild(line);
      this.terminalLines.push(line);

      gsap.to(line, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });

      const maxLines = this.isMobile ? 15 : 28;
      if (this.terminalLines.length > maxLines) {
        this.clearTerminal();
        this.terminalLoopId = setTimeout(addLine, 2000);
      } else {
        this.terminalLoopId = setTimeout(addLine, 300 + Math.random() * 600);
      }
    };

    addLine();
  }

  private clearTerminal(): void {
    const container = this.terminalContainer?.nativeElement;
    if (!container) return;

    gsap.to(this.terminalLines, {
      opacity: 0,
      x: 30,
      duration: 0.6,
      stagger: 0.03,
      onComplete: () => {
        container.innerHTML = '';
        this.terminalLines = [];
      }
    });
  }
}

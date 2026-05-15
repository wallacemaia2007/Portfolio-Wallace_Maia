import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { gsap } from '../../../../core/gsap-register';

import { PortfolioService } from '../../../portfolio/services/portfolio.service';
import { ButtonComponent } from '../button/button.component';

export type LineType =
  | 'command'
  | 'output'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'blank';

export interface ScriptLine {
  type: LineType;
  text: string;
  delay: number;
  typewriter?: boolean;
}

export interface RenderedLine extends ScriptLine {
  id: number;
  visible: boolean;
  typing: boolean;
  typed: string;
}
const TERMINAL_SCRIPT: ScriptLine[] = [
  {
    type: 'command',
    text: 'echo "Bem-vindo ao portfólio de Wallace Maia!"',
    delay: 0,
    typewriter: true,
  },
  {
    type: 'info',
    text: ' Desenvolvedor Full Stack | Angular | Java | Spring Boot',
    delay: 160,
  },
  { type: 'info', text: 'Passos, MG - Brasil', delay: 120 },
  { type: 'blank', text: '', delay: 120 },

  { type: 'command', text: 'node -v && npm -v', delay: 0, typewriter: true },
  { type: 'output', text: '    Node.js e NPM detectados ✔', delay: 140 },
  { type: 'blank', text: '', delay: 120 },

  { type: 'command', text: 'ng version', delay: 0, typewriter: true },
  {
    type: 'output',
    text: '    Angular CLI (Angular 19) pronto para produção',
    delay: 160,
  },
  { type: 'output', text: '    TypeScript + RxJS carregados', delay: 120 },
  { type: 'blank', text: '', delay: 120 },

  { type: 'command', text: 'npm install', delay: 0, typewriter: true },
  {
    type: 'output',
    text: '    Dependências instaladas: Angular, TypeScript, RxJS',
    delay: 160,
  },
  {
    type: 'output',
    text: '    UI: Angular Material, PrimeNG, Tailwind CSS',
    delay: 140,
  },
  { type: 'success', text: '  ✔  Frontend dependencies OK', delay: 180 },
  { type: 'blank', text: '', delay: 120 },

  { type: 'command', text: 'npm install gsap', delay: 0, typewriter: true },
  {
    type: 'output',
    text: '    GSAP instalado (animações e microinterações)',
    delay: 140,
  },
  { type: 'blank', text: '', delay: 120 },

  { type: 'command', text: 'ng test', delay: 0, typewriter: true },
  { type: 'output', text: '    Suítes de testes executadas', delay: 140 },
  { type: 'success', text: '  ✔  Testes do frontend finalizados!', delay: 180 },
  { type: 'blank', text: '', delay: 120 },

  {
    type: 'command',
    text: 'ng build --configuration production',
    delay: 0,
    typewriter: true,
  },
  {
    type: 'output',
    text: '    Build otimizado: lazy-loading + tree-shaking',
    delay: 150,
  },
  {
    type: 'output',
    text: '    Tailwind CSS aplicado + componentes Material/PrimeNG',
    delay: 140,
  },
  { type: 'success', text: '  ✔  Frontend pronto para deploy!', delay: 180 },
  { type: 'blank', text: '', delay: 120 },

  { type: 'command', text: 'mvn -v', delay: 0, typewriter: true },
  { type: 'output', text: '    Maven detectado ✔', delay: 140 },
  { type: 'blank', text: '', delay: 120 },

  { type: 'command', text: 'mvn test', delay: 0, typewriter: true },
  {
    type: 'output',
    text: '    Testes: JUnit + Mockito executados',
    delay: 160,
  },
  { type: 'success', text: '  ✔  Backend test suite OK', delay: 180 },
  { type: 'blank', text: '', delay: 120 },

  {
    type: 'command',
    text: 'java -jar spring-app.jar',
    delay: 0,
    typewriter: true,
  },
  { type: 'output', text: '    Spring Boot inicializado', delay: 150 },
  {
    type: 'output',
    text: '    Spring Security: autenticação/autorização configuradas',
    delay: 140,
  },
  {
    type: 'output',
    text: '    Persistência: Spring Data JPA + Hibernate',
    delay: 140,
  },
  {
    type: 'output',
    text: '    Banco conectado: MySQL (experiência também com PostgreSQL/MongoDB)',
    delay: 140,
  },
  { type: 'success', text: '  ✔  Backend operacional!', delay: 180 },
  { type: 'blank', text: '', delay: 120 },

  {
    type: 'command',
    text: 'swagger-ui: open http://localhost:8080/swagger-ui',
    delay: 0,
    typewriter: true,
  },
  {
    type: 'output',
    text: '    Swagger disponível para documentação da API',
    delay: 140,
  },
  { type: 'blank', text: '', delay: 120 },

  {
    type: 'command',
    text: 'postman run digital-bank-api.collection.json',
    delay: 0,
    typewriter: true,
  },
  {
    type: 'output',
    text: '    Coleção Postman executada (validação de endpoints)',
    delay: 140,
  },
  { type: 'success', text: '  ✔  Rotas REST validadas!', delay: 180 },
  { type: 'blank', text: '', delay: 120 },
  { type: 'command', text: 'docker compose up -d', delay: 0, typewriter: true },
  { type: 'output', text: '    Containers iniciados: app + banco', delay: 140 },
  { type: 'success', text: '  ✔  Ambiente dockerizado no ar!', delay: 180 },
  { type: 'blank', text: '', delay: 120 },

  { type: 'command', text: 'npm run api', delay: 0, typewriter: true },
  { type: 'output', text: '    JSON Server rodando com bd.json', delay: 140 },
  {
    type: 'output',
    text: '    Express/Node.js prontos para rotas e middleware',
    delay: 140,
  },
  { type: 'success', text: '  ✔  Mock backend online!', delay: 180 },
  { type: 'blank', text: '', delay: 120 },

  { type: 'info', text: ' Projetos em destaque:', delay: 200 },
  {
    type: 'info',
    text: '  - Digital Bank API (Java, Spring Boot, JPA, Security, MySQL, Swagger)',
    delay: 170,
  },
  {
    type: 'info',
    text: '  - Traveler Website (Angular 19, OAuth, RxJS, Angular Material, Tailwind)',
    delay: 170,
  },
  {
    type: 'info',
    text: '  - Portfólio Pessoal (Angular, Tailwind, Node.js, Express, JSON Server)',
    delay: 170,
  },
  { type: 'blank', text: '', delay: 120 },
  {
    type: 'command',
    text: 'git status && git log -1 --oneline',
    delay: 0,
    typewriter: true,
  },
  {
    type: 'output',
    text: '    Versionamento com Git + publicação no GitHub',
    delay: 140,
  },
  { type: 'blank', text: '', delay: 120 },

  {
    type: 'info',
    text: ' Sempre aprendendo: arquitetura, testes, UI/UX e boas práticas',
    delay: 200,
  },
  { type: 'info', text: '📩 Contato: wallacemaia2007@gmail.com', delay: 200 },
  {
    type: 'info',
    text: '🔗 LinkedIn: linkedin.com/in/wallacemaia-dev',
    delay: 200,
  },
  { type: 'info', text: '💻 GitHub: github.com/wallacemaia2007', delay: 200 },
];
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private ctx?: gsap.Context;

  personalInfo: any = { name: '', role: '', description: '', avatar: '' };

  terminalLines: RenderedLine[] = [];
  terminalIdle = false;

  private timeouts: ReturnType<typeof setTimeout>[] = [];

  ngOnInit(): void {
    this.portfolioService.getPersonalInfo().subscribe((info) => {
      this.personalInfo = info;
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.ngZone.runOutsideAngular(() => {
      const scope = document.querySelector(
        'app-hero-section',
      ) as HTMLElement | null;
      if (!scope) return;

      this.ctx = gsap.context(() => {
        gsap.set(
          [
            '[data-hero-kicker]',
            '[data-hero-name]',
            '[data-hero-role]',
            '[data-hero-stack]',
            '[data-hero-desc]',
            '[data-hero-actions]',
            '[data-hero-status]',
          ],
          { opacity: 0, y: 22 },
        );
        gsap.set('[data-hero-terminal]', { opacity: 0, x: 32 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to('[data-hero-kicker]', { opacity: 1, y: 0, duration: 0.55 })
          .to('[data-hero-name]', { opacity: 1, y: 0, duration: 0.65 }, '-=0.3')
          .to('[data-hero-role]', { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
          .to(
            '[data-hero-stack]',
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.35',
          )
          .to('[data-hero-desc]', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
          .to(
            '[data-hero-actions]',
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.25',
          )
          .to(
            '[data-hero-status]',
            { opacity: 1, y: 0, duration: 0.45 },
            '-=0.2',
          )
          .to(
            '[data-hero-terminal]',
            { opacity: 1, x: 0, duration: 0.65, ease: 'power2.out' },
            '-=0.1',
          )
          .to(
            '[data-hero-wave]',
            {
              rotate: 18,
              transformOrigin: '70% 70%',
              duration: 0.25,
              yoyo: true,
              repeat: 5,
              ease: 'power1.inOut',
            },
            '<',
          );
      }, scope);
    });

    const t = setTimeout(() => this.runScript(), 1800);
    this.timeouts.push(t);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    this.timeouts.forEach(clearTimeout);
  }

  private runScript(): void {
    let accumulated = 0;

    TERMINAL_SCRIPT.forEach((scriptLine, index) => {
      accumulated += scriptLine.delay;
      const startAt = accumulated;

      const t = setTimeout(() => {
        this.ngZone.run(() => {
          if (scriptLine.type === 'blank') {
            this.terminalLines.push({
              ...scriptLine,
              id: index,
              visible: true,
              typing: false,
              typed: '',
            });
            return;
          }

          const rendered: RenderedLine = {
            ...scriptLine,
            id: index,
            visible: false,
            typing: !!scriptLine.typewriter,
            typed: scriptLine.typewriter ? '' : scriptLine.text,
          };
          this.terminalLines.push(rendered);

          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              const idx = this.terminalLines.findIndex((l) => l.id === index);
              if (idx !== -1) this.terminalLines[idx].visible = true;
            }),
          );

          this.scrollBottom();

          if (scriptLine.typewriter) {
            this.typewriterLine(rendered);
          }
        });
      }, startAt);

      if (scriptLine.typewriter) {
        accumulated += scriptLine.text.length * 38;
      }

      this.timeouts.push(t);
    });

    const tIdle = setTimeout(() => {
      this.ngZone.run(() => (this.terminalIdle = true));
    }, accumulated + 600);
    this.timeouts.push(tIdle);
  }

  private typewriterLine(line: RenderedLine): void {
    const fullText = line.text;
    const MS_PER_CHAR = 38;
    let i = 0;

    const tick = () => {
      i++;
      const idx = this.terminalLines.findIndex((l) => l.id === line.id);
      if (idx === -1) return;

      this.ngZone.run(() => {
        this.terminalLines[idx].typed = fullText.slice(0, i);
        if (i >= fullText.length) {
          this.terminalLines[idx].typing = false;
        }
        this.scrollBottom();
      });

      if (i < fullText.length) {
        const t = setTimeout(tick, MS_PER_CHAR);
        this.timeouts.push(t);
      }
    };

    const t = setTimeout(tick, MS_PER_CHAR);
    this.timeouts.push(t);
  }

  private scrollBottom(): void {
    const t = setTimeout(() => {
      const el = document.querySelector('[data-terminal-body]');
      if (el) el.scrollTop = el.scrollHeight;
    }, 30);
    this.timeouts.push(t);
  }

  getLineClass(type: LineType): string {
    const map: Record<LineType, string> = {
      command: 'text-custom-black dark:text-white font-semibold',
      output: 'text-custom-black-lighter dark:text-gray-400',
      success: 'text-accent dark:text-accent-light',
      error: 'text-primary dark:text-primary-light',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-custom-black-light dark:text-gray-300',
      blank: '',
    };
    return map[type] ?? '';
  }
}

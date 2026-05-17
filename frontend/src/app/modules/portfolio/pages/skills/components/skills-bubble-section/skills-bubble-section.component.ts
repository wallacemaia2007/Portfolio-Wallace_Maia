import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  NgZone,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  Skill,
  SkillCategoryType,
  SKILL_CATEGORY_NAMES,
} from '../../../../models/skill.model';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { PortfolioService } from '../../../../services/portfolio.service';

interface BubbleState {
  skill: Skill;
  x: number; // posição real (física)
  y: number;
  rx: number; // posição visual interpolada (lerp)
  ry: number;
  vx: number; // velocidade
  vy: number;
  radius: number;
  size: number;
  color: string;
  dragging: boolean;
  dragOffX: number;
  dragOffY: number;
  scale: number;
  targetScale: number;
  opacity: number;
  targetOpacity: number;
  revealPulse: boolean;
}

interface CategoryMeta {
  type: SkillCategoryType;
  name: string;
  color: string;
  count: number;
}

const CATEGORY_COLORS: Record<SkillCategoryType, string> = {
  frontend: '#3b82f6',
  backend: '#10b981',
  database: '#f59e0b',
  tools: '#8b5cf6',
  'soft-skills': '#ec4899',
};

// Tamanhos de bolha por nível - Desktop (diferença mais marcada entre os níveis)
const SIZE_BY_LEVEL_DESKTOP = [36, 54, 78, 98, 134];

// Tamanhos de bolha por nível - Tablet (mesma proporção que desktop)
const SIZE_BY_LEVEL_TABLET = [40, 48, 56, 68, 80];

// Tamanhos de bolha por nível - Mobile (reduzido em ~35%)
const SIZE_BY_LEVEL_MOBILE = [26, 32, 36, 44, 52];

const LERP = 0.085;

@Component({
  selector: 'app-skills-bubble-section',
  standalone: true,
  imports: [CommonModule, MatIconModule, SectionHeaderComponent],
  templateUrl: './skills-bubble-section.component.html',
  styleUrl: './skills-bubble-section.component.scss',
})
export class SkillsBubbleSectionComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private portfolioService = inject(PortfolioService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  @ViewChild('stageRef') stageRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('bubbleEl') bubbleEls!: QueryList<ElementRef<HTMLDivElement>>;

  skills: Skill[] = [];
  selectedSkill: Skill | null = null;
  filterCategory: SkillCategoryType | null = null;
  iconError = false;
  detailPos = { x: 0, y: 0 };
  categoryList: CategoryMeta[] = [];

  bubbles: BubbleState[] = [];
  private allBubbles: BubbleState[] = [];
  private animFrameId: number | null = null;
  private resizeObserver?: ResizeObserver;
  private stageW = 0;
  private stageH = 0;
  private currentBreakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  // Drag
  private dragBubble: BubbleState | null = null;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragMoved = false;
  private readonly DRAG_THRESHOLD = 6;

  private boundMouseMove!: (e: MouseEvent) => void;
  private boundMouseUp!: (e: MouseEvent) => void;
  private boundTouchMove!: (e: TouchEvent) => void;
  private boundTouchEnd!: (e: TouchEvent) => void;

  ngOnInit(): void {
    this.portfolioService.getSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
        this.buildCategoryList(skills);
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.initBubbles(), 0);
        }
      },
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observeStageResize();
    this.registerGlobalListeners();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    this.resizeObserver?.disconnect();
    this.removeGlobalListeners();
  }

  // ─── Breakpoint detection ──────────────────────────────────────────────────

  private detectBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getSizeArrayForBreakpoint(): number[] {
    switch (this.currentBreakpoint) {
      case 'mobile':
        return SIZE_BY_LEVEL_MOBILE;
      case 'tablet':
        return SIZE_BY_LEVEL_TABLET;
      case 'desktop':
      default:
        return SIZE_BY_LEVEL_DESKTOP;
    }
  }

  private getSizeByLevel(level: number): number {
    const sizeArray = this.getSizeArrayForBreakpoint();
    return sizeArray[level - 1] ?? sizeArray[2]; // fallback para nível 3
  }

  // ─── Global listeners ──────────────────────────────────────────────────────

  private registerGlobalListeners(): void {
    this.boundMouseMove = (e) => this.onGlobalMouseMove(e);
    this.boundMouseUp = (e) => this.onGlobalMouseUp(e);
    this.boundTouchMove = (e) => this.onGlobalTouchMove(e);
    this.boundTouchEnd = (e) => this.onGlobalTouchEnd(e);

    window.addEventListener('mousemove', this.boundMouseMove, {
      passive: true,
    });
    window.addEventListener('mouseup', this.boundMouseUp);
    window.addEventListener('touchmove', this.boundTouchMove, {
      passive: false,
    });
    window.addEventListener('touchend', this.boundTouchEnd);
  }

  private removeGlobalListeners(): void {
    window.removeEventListener('mousemove', this.boundMouseMove);
    window.removeEventListener('mouseup', this.boundMouseUp);
    window.removeEventListener('touchmove', this.boundTouchMove);
    window.removeEventListener('touchend', this.boundTouchEnd);
  }

  // ─── Category ──────────────────────────────────────────────────────────────

  private buildCategoryList(skills: Skill[]): void {
    const counts = new Map<SkillCategoryType, number>();
    skills.forEach((s) =>
      counts.set(s.category, (counts.get(s.category) ?? 0) + 1),
    );
    this.categoryList = Array.from(counts.entries()).map(([type, count]) => ({
      type,
      name: SKILL_CATEGORY_NAMES[type] ?? type,
      color: CATEGORY_COLORS[type] ?? '#9b1b1f',
      count,
    }));
  }

  getCategoryLabel(type: SkillCategoryType): string {
    return SKILL_CATEGORY_NAMES[type] ?? type;
  }

  getLevelLabel(level: number): string {
    const labels: Record<number, string> = {
      1: 'Iniciante',
      2: 'Básico',
      3: 'Intermediário',
      4: 'Avançado',
      5: 'Expert',
    };
    return labels[level] ?? '';
  }

  // ─── Filter ────────────────────────────────────────────────────────────────

  toggleFilter(type: SkillCategoryType): void {
    this.filterCategory = this.filterCategory === type ? null : type;
    this.selectedSkill = null;
    this.applyFilter();
  }

  clearFilter(): void {
    this.filterCategory = null;
    this.selectedSkill = null;
    this.applyFilter();
  }

  private applyFilter(): void {
    const shouldShow = (bubble: BubbleState) =>
      !this.filterCategory || bubble.skill.category === this.filterCategory;

    this.selectedSkill = null;

    this.allBubbles.forEach((bubble) => {
      const isVisible = shouldShow(bubble);
      const entering = isVisible && bubble.targetOpacity === 0;

      if (isVisible) {
        bubble.targetOpacity = 1;
        bubble.targetScale = 1;
        if (entering || bubble.opacity < 0.05) {
          bubble.opacity = 0;
          bubble.scale = 0.16;
          setTimeout(() => {
            bubble.revealPulse = false;
          }, 240);
        }
      } else {
        bubble.targetOpacity = 0;
        bubble.targetScale = 0.16;
        bubble.revealPulse = false;
      }

      bubble.dragging = false;
      if (!isVisible) {
        bubble.vx *= 0.6;
        bubble.vy *= 0.6;
      }
    });

    this.bubbles = [...this.allBubbles];
    setTimeout(() => this.applyBubbleStyles(), 0);
  }

  // ─── Bubble init ───────────────────────────────────────────────────────────

  private initBubbles(): void {
    const stage = this.stageRef?.nativeElement;
    if (!stage) return;
    this.stageW = stage.clientWidth;
    this.stageH = stage.clientHeight;

    // Detectar breakpoint na inicialização
    this.currentBreakpoint = this.detectBreakpoint();

    this.allBubbles = this.skills.map((skill) => {
      const size = this.getSizeByLevel(skill.level);
      const r = size / 2;
      const x = r + Math.random() * (this.stageW - size);
      const y = r + Math.random() * (this.stageH - size);
      const speed = 0.15 + Math.random() * 0.2;
      const angle = Math.random() * Math.PI * 2;
      return {
        skill,
        x,
        y,
        rx: x,
        ry: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: r,
        size,
        color: CATEGORY_COLORS[skill.category] ?? '#9b1b1f',
        dragging: false,
        dragOffX: 0,
        dragOffY: 0,
        scale: 0.16,
        targetScale: 1,
        opacity: 0,
        targetOpacity: 1,
        revealPulse: false,
      };
    });

    this.bubbles = [...this.allBubbles];
    this.skills = this.bubbles.map((b) => b.skill);

    setTimeout(() => {
      this.applyBubbleStyles();
      this.startAnimation();
    }, 50);
  }

  private applyBubbleStyles(): void {
    const els = this.bubbleEls?.toArray();
    if (!els) return;
    els.forEach((elRef, i) => {
      const b = this.bubbles[i];
      if (!b) return;
      const el = elRef.nativeElement;
      el.style.width = b.size + 'px';
      el.style.height = b.size + 'px';
      el.style.setProperty('--bubble-border', `${b.color}55`);
      el.style.setProperty('--bubble-color', b.color);
      el.style.transformOrigin = 'center center';
    });
  }

  // ─── Animation loop ────────────────────────────────────────────────────────

  private startAnimation(): void {
    this.stopAnimation();
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.tick();
        this.animFrameId = requestAnimationFrame(loop);
      };
      this.animFrameId = requestAnimationFrame(loop);
    });
  }

  private stopAnimation(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private tick(): void {
    const els = this.bubbleEls?.toArray();
    if (!els || !this.stageW) return;

    this.bubbles.forEach((b, i) => {
      b.opacity += (b.targetOpacity - b.opacity) * 0.12;
      b.scale += (b.targetScale - b.scale) * 0.15;

      const isActive = b.targetOpacity > 0.5 || b.opacity > 0.5;

      if (b.dragging) {
        // Visual segue a posição real com peso (lerp mais forte)
        b.rx += (b.x - b.rx) * 0.28;
        b.ry += (b.y - b.ry) * 0.28;
      } else if (isActive) {
        // Física de drift
        b.x += b.vx;
        b.y += b.vy;

        // Bounce com amortização suave
        if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx = Math.abs(b.vx) * 0.85;
        }
        if (b.x + b.radius > this.stageW) {
          b.x = this.stageW - b.radius;
          b.vx = -Math.abs(b.vx) * 0.85;
        }
        if (b.y - b.radius < 0) {
          b.y = b.radius;
          b.vy = Math.abs(b.vy) * 0.85;
        }
        if (b.y + b.radius > this.stageH) {
          b.y = this.stageH - b.radius;
          b.vy = -Math.abs(b.vy) * 0.85;
        }

        // Colisão elástica suave entre bolhas
        for (let j = i + 1; j < this.bubbles.length; j++) {
          const o = this.bubbles[j];
          if (o.dragging || !(o.targetOpacity > 0.5 || o.opacity > 0.5))
            continue;
          const dx = o.x - b.x;
          const dy = o.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
          const minDist = b.radius + o.radius + 2;
          if (dist < minDist) {
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;
            b.x -= nx * overlap * 0.5;
            b.y -= ny * overlap * 0.5;
            o.x += nx * overlap * 0.5;
            o.y += ny * overlap * 0.5;
            // Troca de velocidade proporcional
            const dot = (b.vx - o.vx) * nx + (b.vy - o.vy) * ny;
            if (dot > 0) {
              b.vx -= dot * nx * 0.4;
              b.vy -= dot * ny * 0.4;
              o.vx += dot * nx * 0.4;
              o.vy += dot * ny * 0.4;
            }
          }
        }

        // Lerp visual suave
        b.rx += (b.x - b.rx) * LERP;
        b.ry += (b.y - b.ry) * LERP;

        // Manter velocidade mínima (drift eterno)
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed < 0.07) {
          b.vx += (Math.random() - 0.5) * 0.05;
          b.vy += (Math.random() - 0.5) * 0.05;
        }
        // Limitar velocidade máxima
        if (speed > 0.55) {
          b.vx = (b.vx / speed) * 0.55;
          b.vy = (b.vy / speed) * 0.55;
        }
      } else {
        b.vx *= 0.92;
        b.vy *= 0.92;
      }

      // Aplicar ao DOM com transform (GPU-accelerated, sem reflow)
      const el = els[i]?.nativeElement;
      if (el) {
        el.style.transform = `translate(${b.rx - b.radius}px, ${b.ry - b.radius}px) scale(${Math.max(
          0.1,
          b.scale,
        )})`;
        el.style.opacity = String(Math.max(0, Math.min(1, b.opacity)));
        el.style.pointerEvents = b.opacity < 0.05 ? 'none' : 'auto';
      }
    });
  }

  private observeStageResize(): void {
    const stage = this.stageRef?.nativeElement;
    if (!stage || !('ResizeObserver' in window)) return;
    this.resizeObserver = new ResizeObserver(() => {
      this.stageW = stage.clientWidth;
      this.stageH = stage.clientHeight;

      // Detectar mudança de breakpoint
      const newBreakpoint = this.detectBreakpoint();
      if (newBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = newBreakpoint;
        // Reinicializar bolhas com novos tamanhos
        this.reinitBubblesForBreakpoint();
      }
    });
    this.resizeObserver.observe(stage);
  }

  private reinitBubblesForBreakpoint(): void {
    // Atualizar tamanho de todas as bolhas baseado no novo breakpoint
    this.allBubbles.forEach((b) => {
      const newSize = this.getSizeByLevel(b.skill.level);
      const oldRadius = b.radius;
      const newRadius = newSize / 2;

      b.size = newSize;
      b.radius = newRadius;

      // Ajustar posição para manter a bolha dentro dos limites
      if (b.x + newRadius > this.stageW) {
        b.x = this.stageW - newRadius;
      }
      if (b.y + newRadius > this.stageH) {
        b.y = this.stageH - newRadius;
      }
      if (b.x - newRadius < 0) {
        b.x = newRadius;
      }
      if (b.y - newRadius < 0) {
        b.y = newRadius;
      }
    });

    this.bubbles = [...this.allBubbles];
    this.applyBubbleStyles();
  }

  // ─── Drag: Mouse ───────────────────────────────────────────────────────────

  onBubbleMouseDown(bubble: BubbleState, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.startDrag(bubble, event.clientX, event.clientY);
  }

  private onGlobalMouseMove(event: MouseEvent): void {
    if (!this.dragBubble) return;
    this.moveDrag(event.clientX, event.clientY);
  }

  private onGlobalMouseUp(event: MouseEvent): void {
    if (!this.dragBubble) return;
    this.endDrag(event.clientX, event.clientY, this.dragBubble);
  }

  // ─── Drag: Touch ───────────────────────────────────────────────────────────

  onBubbleTouchStart(bubble: BubbleState, event: TouchEvent): void {
    event.stopPropagation();
    const t = event.touches[0];
    this.startDrag(bubble, t.clientX, t.clientY);
  }

  private onGlobalTouchMove(event: TouchEvent): void {
    if (!this.dragBubble) return;
    event.preventDefault();
    const t = event.touches[0];
    this.moveDrag(t.clientX, t.clientY);
  }

  private onGlobalTouchEnd(event: TouchEvent): void {
    if (!this.dragBubble) return;
    const t = event.changedTouches[0];
    this.endDrag(t.clientX, t.clientY, this.dragBubble);
  }

  // ─── Drag core ─────────────────────────────────────────────────────────────

  private startDrag(
    bubble: BubbleState,
    clientX: number,
    clientY: number,
  ): void {
    this.dragBubble = bubble;
    this.dragStartX = clientX;
    this.dragStartY = clientY;
    this.dragMoved = false;
    bubble.dragging = true;
    bubble.vx = 0;
    bubble.vy = 0;

    const rect = this.stageRef?.nativeElement.getBoundingClientRect();
    if (!rect) return;
    bubble.dragOffX = clientX - rect.left - bubble.x;
    bubble.dragOffY = clientY - rect.top - bubble.y;
  }

  private moveDrag(clientX: number, clientY: number): void {
    const b = this.dragBubble;
    if (!b) return;

    const dx = clientX - this.dragStartX;
    const dy = clientY - this.dragStartY;
    if (!this.dragMoved && Math.sqrt(dx * dx + dy * dy) > this.DRAG_THRESHOLD) {
      this.dragMoved = true;
      // Fechar card de detalhe ao começar arrastar
      this.ngZone.run(() => {
        this.selectedSkill = null;
      });
    }

    const rect = this.stageRef?.nativeElement.getBoundingClientRect();
    if (!rect) return;

    let nx = clientX - rect.left - b.dragOffX;
    let ny = clientY - rect.top - b.dragOffY;

    nx = Math.max(b.radius, Math.min(this.stageW - b.radius, nx));
    ny = Math.max(b.radius, Math.min(this.stageH - b.radius, ny));

    // Velocidade baseada no delta de posição (jogar ao soltar)
    b.vx = (nx - b.x) * 0.35;
    b.vy = (ny - b.y) * 0.35;

    b.x = nx;
    b.y = ny;
  }

  private endDrag(clientX: number, clientY: number, bubble: BubbleState): void {
    bubble.dragging = false;
    this.dragBubble = null;

    if (!this.dragMoved) {
      // Foi um clique: abrir detalhe
      this.ngZone.run(() => this.openDetail(bubble.skill, clientX, clientY));
    } else {
      // Limitar velocidade de lançamento
      const speed = Math.sqrt(bubble.vx * bubble.vx + bubble.vy * bubble.vy);
      if (speed > 3) {
        bubble.vx = (bubble.vx / speed) * 3;
        bubble.vy = (bubble.vy / speed) * 3;
      }
    }
  }

  // ─── Detail card ───────────────────────────────────────────────────────────

  private openDetail(skill: Skill, clientX: number, clientY: number): void {
    if (this.selectedSkill?.id === skill.id) {
      this.selectedSkill = null;
      return;
    }
    this.iconError = false;
    this.selectedSkill = skill;
    this.positionDetailCard(clientX, clientY);
  }

  private positionDetailCard(clientX: number, clientY: number): void {
    const stage = this.stageRef?.nativeElement;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();

    // Ajustar tamanho do card baseado no breakpoint
    let cardW = 240;
    let cardH = 270;

    if (this.currentBreakpoint === 'mobile') {
      cardW = 200;
      cardH = 250;
    } else if (this.currentBreakpoint === 'tablet') {
      cardW = 220;
      cardH = 260;
    }

    let x = clientX - rect.left + 20;
    let y = clientY - rect.top - 20;

    if (x + cardW > this.stageW - 8) x = this.stageW - cardW - 8;
    if (x < 8) x = 8;
    if (y + cardH > this.stageH - 8) y = this.stageH - cardH - 8;
    if (y < 8) y = 8;

    this.detailPos = { x, y };
  }

  closeDetail(event: MouseEvent): void {
    event.stopPropagation();
    this.selectedSkill = null;
  }

  // Ensure single-tap opens detail on mobile/desktop
  onBubbleClick(bubble: BubbleState, event: MouseEvent): void {
    event.stopPropagation();
    // ignore clicks while dragging or when pointer-events are disabled
    if (bubble.dragging || this.dragBubble) return;
    if (bubble.opacity < 0.08) return;
    this.openDetail(bubble.skill, event.clientX, event.clientY);
  }

  /** Fechar ao clicar no fundo da stage */
  onStageClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.skill-bubble') || target.closest('.detail-card'))
      return;
    this.selectedSkill = null;
  }

  onImgError(event: Event, skill: Skill): void {
    if (this.selectedSkill?.id === skill.id) this.iconError = true;
    (event.target as HTMLImageElement).style.display = 'none';
  }
}

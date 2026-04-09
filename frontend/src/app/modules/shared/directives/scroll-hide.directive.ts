import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollHide]',
  standalone: true,
})
export class ScrollHideDirective {
  private lastScrollTop = 0;
  private readonly MIN_DISTANCE = 80;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.pageYOffset;

    // Adiciona classe "scrolled" quando sai do topo
    if (scrollTop > 24) {
      this.renderer.addClass(this.el.nativeElement, 'header--scrolled');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'header--scrolled');
    }

    // Esconde ao rolar para baixo, mostra ao rolar para cima
    if (scrollTop > this.lastScrollTop && scrollTop > this.MIN_DISTANCE) {
      this.renderer.addClass(this.el.nativeElement, 'header--hidden');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'header--hidden');
    }

    // Sempre mostra quando está no topo
    if (scrollTop < 10) {
      this.renderer.removeClass(this.el.nativeElement, 'header--hidden');
    }

    this.lastScrollTop = scrollTop;
  }
}

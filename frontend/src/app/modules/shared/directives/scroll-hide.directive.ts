import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollHide]',
  standalone: true,
})
export class ScrollHideDirective {
  private lastScrollTop = 0;
  private scrollSize = 0;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.pageYOffset;
    const minDistance = 200;

    const isAtTop = scrollTop < 10;

    if (scrollTop > this.lastScrollTop) {
      this.hideElement();
    } else {
      this.showElement();
    }

    if (scrollTop <= minDistance) {
      this.showElement();
      this.lastScrollTop = scrollTop;
      return;
    }

    if (isAtTop) {
      this.showElement();
      this.lastScrollTop = scrollTop;
      return;
    }

    this.lastScrollTop = scrollTop;
  }

  private showElement(): void {
    this.renderer.removeClass(this.el.nativeElement, '-top-24');
    this.renderer.addClass(this.el.nativeElement, 'top-0');
  }

  private hideElement(): void {
    this.renderer.removeClass(this.el.nativeElement, 'top-0');
    this.renderer.addClass(this.el.nativeElement, '-top-24');
  }
}

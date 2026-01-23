import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appScrollReveal]",
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealFrom: "bottom" | "top" | "left" | "right" = "bottom";
  @Input() revealDelay = 0;
  @Input() revealOnce = false;
  @Input() hideOnExit = true;

  private observer!: IntersectionObserver;
  private initialTransform = "translateY(40px)";

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.setInitialStyles();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.reveal();
            if (this.revealOnce) {
              this.observer.unobserve(this.el.nativeElement);
            }
          } else if (this.hideOnExit && !this.revealOnce) {
            this.hide();
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setInitialStyles(): void {
    this.renderer.setStyle(this.el.nativeElement, "opacity", "0");
    this.renderer.setStyle(
      this.el.nativeElement,
      "transition",
      "opacity 0.6s ease, transform 0.6s ease"
    );

    switch (this.revealFrom) {
      case "top":
        this.initialTransform = "translateY(-40px)";
        break;
      case "left":
        this.initialTransform = "translateX(-40px)";
        break;
      case "right":
        this.initialTransform = "translateX(40px)";
        break;
    }

    this.renderer.setStyle(this.el.nativeElement, "transform", this.initialTransform);
  }

  private reveal(): void {
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, "opacity", "1");
      this.renderer.setStyle(
        this.el.nativeElement,
        "transform",
        "translate(0)"
      );
    }, this.revealDelay);
  }

  private hide(): void {
    this.renderer.setStyle(this.el.nativeElement, "opacity", "0");
    this.renderer.setStyle(this.el.nativeElement, "transform", this.initialTransform);
  }
}

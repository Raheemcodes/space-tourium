import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('activeIdentifier') activeIdentifier!: ElementRef<HTMLElement>;
  @ViewChild('desktopNavList') desktopNavList!: ElementRef<HTMLElement>;
  @ViewChild('toggleBtn') toggleBtn!: ElementRef<HTMLElement>;
  @ViewChild('mobilenav') nav!: ElementRef<HTMLElement>;

  open: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      if (this.open && innerWidth >= 768) this.toggleNav();
    });
  }

  ngAfterViewInit(): void {}

  translateBy(): number {
    const desktopNavList = this.desktopNavList.nativeElement;
    let translateBy: number = 0;
    const gap: number = 32;

    for (let i = 0; i < desktopNavList.children.length; i++) {
      if (desktopNavList.children[i].classList.contains('active')) break;

      translateBy += desktopNavList.children[i].clientWidth + gap;
    }

    return translateBy;
  }

  onActiveChange() {
    setTimeout(() => {
      const activeElement: HTMLLIElement =
        this.desktopNavList.nativeElement.querySelector(
          '.desktop-nav__list-item.active'
        )!;
      const activeIdentifier = this.activeIdentifier.nativeElement;

      console.log(activeElement.clientWidth);

      this.renderer.setStyle(
        activeIdentifier,
        'width',
        `${activeElement.clientWidth}px`
      );
      this.renderer.setStyle(
        activeIdentifier,
        'transform',
        `translateX(${this.translateBy()}px)`
      );
    }, 50);
  }

  toggleNav() {
    const nav = document.querySelector('app-mobile-nav')!;
    const toggleBtn = this.toggleBtn.nativeElement;

    if (!this.open) {
      this.renderer.addClass(nav, 'opened');
      this.renderer.addClass(toggleBtn, 'opened');
      this.open = true;
    } else {
      this.renderer.removeClass(nav, 'opened');
      this.renderer.removeClass(toggleBtn, 'opened');
      this.open = false;
    }
  }
}

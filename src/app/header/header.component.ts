import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('activeIdentifier') activeIdentifier!: ElementRef<HTMLElement>;
  @ViewChild('desktopNavList') desktopNavList!: ElementRef<HTMLElement>;
  load: boolean = false;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {}

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
}

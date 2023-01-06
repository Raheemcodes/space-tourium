import { NavigationEnd, Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

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

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.open) {
        setTimeout(this.toggleNav.bind(this), 200);
      }
    });
    window.addEventListener('resize', () => {
      if (this.open && innerWidth >= 768) this.toggleNav();
    });
  }

  ngAfterViewInit(): void {}

  toggleNav() {
    const nav = document.querySelector('app-mobile-nav')!;
    const toggleBtn = this.toggleBtn.nativeElement;
    const body = this.document.body;

    if (!this.open) {
      this.renderer.addClass(nav, 'opened');
      this.renderer.addClass(toggleBtn, 'opened');
      this.renderer.addClass(toggleBtn, 'opened');
      this.renderer.addClass(body, 'noscroll');
      this.open = true;
    } else {
      this.renderer.removeClass(nav, 'opened');
      this.renderer.removeClass(toggleBtn, 'opened');
      this.renderer.removeClass(body, 'noscroll');
      this.open = false;
    }
  }
}

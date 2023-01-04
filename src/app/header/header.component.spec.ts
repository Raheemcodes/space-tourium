import { HomeComponent } from './../home/home.component';
import { CrewComponent } from './../crew/crew.component';
import { DebugElement, ElementRef } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes, Scroll } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';

import { HeaderComponent } from './header.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crew', component: CrewComponent },
];

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HeaderComponent, MobileNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have logo button', () => {
    expect(de.query(By.css('.logo'))).toBeTruthy();
  });

  it('should have desktop nav', () => {
    expect(de.query(By.css('.desktop-nav'))).toBeTruthy();
  });

  it('should have desktop nav list of four children', () => {
    const desktopNav = de.query(By.css('.desktop-nav__list'));

    expect(desktopNav.children.length).toBe(4);
  });

  describe('Desktop active nav identifier', () => {
    it('should have desktop active nav identifier', () => {
      const activeIndentifier: ElementRef<HTMLElement> = de.query(
        By.css('.active-nav__identifier')
      );
      expect(activeIndentifier).toBeTruthy();
    });

    it('should have width of active navigation element button', fakeAsync(() => {
      TestBed.inject(Router).navigate(['/']);
      tick();

      const navElBtn: ElementRef<HTMLElement> = de.query(
        By.css('.desktop-nav__list-item.active')
      );
      const activeIndentifier: ElementRef<HTMLElement> = de.query(
        By.css('.active-nav__identifier')
      );

      expect(activeIndentifier.nativeElement.clientWidth).toBe(
        navElBtn.nativeElement.clientWidth
      );
    }));

    it('should translate to under the active nav element button', fakeAsync(() => {
      const activeIndentifier: ElementRef<HTMLElement> = de.query(
        By.css('.active-nav__identifier')
      );
      const desktopNavList: HTMLElement = de.query(
        By.css('.desktop-nav__list')
      ).nativeElement;

      const router = TestBed.inject(Router);
      router.navigate(['/crew']);
      tick();

      let translateBy: number = 0;

      // for (let i = 0; i < desktopNavList.children.length; i++) {
      //   if (desktopNavList.children[i].classList.contains('active')) break;
      //   translateBy += desktopNavList.children[i].clientWidth + 32;
      // }

      // console.log(translateBy);
      expect(activeIndentifier.nativeElement.style.transform).toBe(
        `translateX(${component.translateBy()}px)`
      );
    }));

    // it('should call onActiveChangeFn', fakeAsync(() => {
    //   const assert = spyOn(component, 'onActiveChange');
    //   TestBed.inject(Router).navigate(['/']);
    //   tick();

    //   expect(assert).toHaveBeenCalled();
    // }));
  });

  describe('Toggle Button', () => {
    it('should have toggle button', () => {
      expect(de.query(By.css('.toggle-btn'))).toBeTruthy();
    });

    // it('should toggle', () => {});
  });

  it('should have mobileNavComponent', () => {
    expect(de.query(By.css('app-mobile-nav'))).toBeTruthy();
  });

  it('should have mobile nav list of four children', () => {
    const mobileNav = de.query(By.css('.mobile-nav__list'));

    expect(mobileNav).toBeTruthy();
  });
});

import { DOCUMENT } from '@angular/common';
import { TechComponent } from './../tech/tech.component';
import { DestinationComponent } from './../destination/destination.component';
import { DebugElement, ElementRef, NgZone } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CrewComponent } from './../crew/crew.component';
import { HomeComponent } from './../home/home.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';

import { HeaderComponent } from './header.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'destination', component: DestinationComponent },
  { path: 'crew', component: CrewComponent },
  { path: 'tech', component: TechComponent },
];

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let router: Router;
  let zone: NgZone;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HeaderComponent, MobileNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    router = TestBed.inject(Router);
    document = TestBed.inject(DOCUMENT);
    zone = TestBed.inject(NgZone);
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

  it('should have element of class active that contain Home after navigating to /', fakeAsync(() => {
    zone.run(() => router.navigate(['/']));
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.desktop-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('HOME');
  }));

  it('should have element of class active that contain destination after navigating to /destination', fakeAsync(() => {
    zone.run(() => router.navigate(['/destination']));
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.desktop-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('DESTINATION');
  }));

  it('should have element of class active that contain crew after navigating to /crew', fakeAsync(() => {
    zone.run(() => router.navigate(['/crew']));
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.desktop-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('CREW');
  }));

  it('should have element of class active that contain technology after navigating to /tech', fakeAsync(() => {
    zone.run(() => router.navigate(['/tech']));
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.desktop-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('TECHNOLOGY');
  }));

  it('should have mobile nav component', () => {
    const mobileNav = de.query(By.css('app-mobile-nav'));

    expect(mobileNav).toBeTruthy();
  });

  describe('toggleNav()', () => {
    it('should be called on toggle btn click', () => {
      const spyFn = spyOn(component, 'toggleNav');

      component.toggleBtn.nativeElement.dispatchEvent(new Event('click'));
      // de.query(By.css('.toggle-btn')).triggerEventHandler('click');

      expect(spyFn).toHaveBeenCalledTimes(1);
    });

    it('should open if open is false', () => {
      component.open = false;

      component.toggleNav();
      fixture.detectChanges();

      const nav: HTMLElement = document.querySelector('app-mobile-nav')!;

      expect(component.toggleBtn.nativeElement.classList)
        .withContext('toggle btn')
        .toContain('opened');
      expect(nav.classList).withContext('nav').toContain('opened');
      expect(document.body.classList).withContext('body').toContain('noscroll');
      expect(component.open).withContext('open').toBeTrue();
    });

    it('should not open if open is true', () => {
      component.open = true;

      component.toggleNav();
      fixture.detectChanges();

      const nav: HTMLElement = document.querySelector('app-mobile-nav')!;

      expect(component.toggleBtn.nativeElement.classList)
        .withContext('toggle btn')
        .not.toContain('opened');
      expect(nav.classList).withContext('nav').not.toContain('opened');
      expect(document.body.classList)
        .withContext('body')
        .not.toContain('noscroll');
      expect(component.open).withContext('open').toBeFalse();
    });

    it('should toggle', () => {
      component.open = false;

      component.toggleNav();
      expect(component.open).withContext('if open is false').toBeTrue();

      component.toggleNav();
      expect(component.open).withContext('if open is true').toBeFalse;
    });
  });
});

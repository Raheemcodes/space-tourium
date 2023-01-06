import { TechComponent } from './../tech/tech.component';
import { DestinationComponent } from './../destination/destination.component';
import { DebugElement, ElementRef } from '@angular/core';
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

  it('should have element of class active that contain Home after navigating to /', fakeAsync(() => {
    TestBed.inject(Router).navigate(['/']);
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.desktop-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('HOME');
  }));

  it('should have element of class active that contain destination after navigating to /destination', fakeAsync(() => {
    TestBed.inject(Router).navigate(['/destination']);
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.desktop-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('DESTINATION');
  }));

  it('should have element of class active that contain crew after navigating to /crew', fakeAsync(() => {
    TestBed.inject(Router).navigate(['/crew']);
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.desktop-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('CREW');
  }));

  it('should have element of class active that contain technology after navigating to /tech', fakeAsync(() => {
    TestBed.inject(Router).navigate(['/tech']);
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
});

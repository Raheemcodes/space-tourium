import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

  it('should have toggle button', () => {
    expect(de.query(By.css('.toggle-btn'))).toBeTruthy();
  });

  it('should have mobileNavComponent', () => {
    expect(de.query(By.css('app-mobile-nav'))).toBeTruthy();
  });

  it('should have mobile nav list of four children', () => {
    const mobileNav = de.query(By.css('.mobile-nav__list'));

    expect(mobileNav).toBeTruthy();
  });
});

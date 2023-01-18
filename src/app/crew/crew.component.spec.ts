import { NgOptimizedImage } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewComponent } from './crew.component';

describe('CrewComponent', () => {
  let component: CrewComponent;
  let fixture: ComponentFixture<CrewComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrewComponent],
      imports: [NgOptimizedImage],
    }).compileComponents();

    fixture = TestBed.createComponent(CrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(de.query(By.css('.title')).nativeElement.innerText).toBe(
      '02Meet your crew'.toUpperCase()
    );
  });

  it('should have crew image of four', () => {
    const crew: ElementRef<HTMLElement>[] = de.queryAll(By.css('.crew-img'));

    expect(crew.length).toBe(4);
  });

  it('should have pagination of four', () => {
    const crew: ElementRef<HTMLElement>[] = de.queryAll(By.css('.pagination'));

    expect(crew.length).toBe(4);
  });

  it('should have position of four', () => {
    const pos: ElementRef<HTMLElement>[] = de.queryAll(By.css('.position'));

    expect(pos.length).toBe(4);
  });

  it('should have name of four', () => {
    const name: ElementRef<HTMLElement>[] = de.queryAll(By.css('.name'));

    expect(name.length).toBe(4);
  });

  it('should have about of four', () => {
    const about: ElementRef<HTMLElement>[] = de.queryAll(By.css('.about'));

    expect(about.length).toBe(4);
  });

  describe('fadeIn -> fadeOut animation', () => {
    it('should have .crew-img__container element with class active', () => {
      const crewEl = de.query(By.css('.crew-img__container.active'));

      expect(crewEl).toBeTruthy();
    });
  });
});

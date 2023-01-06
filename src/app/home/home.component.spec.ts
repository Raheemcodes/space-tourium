import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have question', () => {
    expect(de.query(By.css('.question'))).toBeTruthy();
  });

  it('should have title', () => {
    expect(de.query(By.css('.title'))).toBeTruthy();
  });

  it('should have main text content', () => {
    expect(de.query(By.css('.text'))).toBeTruthy();
  });

  it('should have explore button', () => {
    const btn = de.query(By.css('button')).nativeElement;

    expect(btn.innerText).toContain('EXPLORE');
  });
});

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
import { DestinationComponent } from './destination.component';

describe('DestinationComponent', () => {
  let component: DestinationComponent;
  let fixture: ComponentFixture<DestinationComponent>;
  let de: DebugElement;

  const routes: Routes = [
    {
      path: 'destination',
      component: DestinationComponent,
      children: [
        { path: '', component: DestinationComponent },
        { path: 'mars', component: DestinationComponent },
        { path: 'europa', component: DestinationComponent },
        { path: 'titan', component: DestinationComponent },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(de.query(By.css('.title'))).toBeTruthy();
  });

  it('should have celestial body of four element', () => {
    const celestial = de.queryAll(By.css('.celestial-body'));

    expect(celestial.length).toBe(4);
  });

  it('should have nav list item of four element', () => {
    const celestial = de.queryAll(By.css('.nav-list__item'));

    expect(celestial.length).toBe(4);
  });

  it('should have content title that changes based on route', fakeAsync(() => {
    const title = de.query(By.css('.content-title')).nativeElement.textContent;
    const router: Router = TestBed.inject(Router);

    tick();
    expect(title).withContext('initial').toBe('MOON');

    router.navigate(['/destination/mars']);
    tick();
    expect(title).withContext('navigated to MARS').toBe('MARS');

    router.navigate(['/destination/europa']);
    tick();
    expect(title).withContext('navigated to EUROPA').toBe('EUROPA');

    router.navigate(['/destination/titan']);
    tick();
    expect(title).withContext('navigated to TITAN').toBe('TITAN');
  }));

  it('should have element of class active that contain Home after navigating to /', fakeAsync(() => {
    TestBed.inject(Router).navigate(['/']);
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.nav-list__item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('MOON');
  }));

  it('should have element of class active that contain destination after navigating to /mars', fakeAsync(() => {
    TestBed.inject(Router).navigate(['/destination/mars']);
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.nav-list__item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('MARS');
  }));

  it('should have element of class active that contain crew after navigating to /europa', fakeAsync(() => {
    TestBed.inject(Router).navigate(['/destination/europa']);
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.nav-list__item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('EUROPA');
  }));

  it('should have element of class active that contain technology after navigating to /titan', fakeAsync(() => {
    TestBed.inject(Router).navigate(['/destination/titan']);
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.nav-list__item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('TITAN');
  }));

  it('should have 2 units', () => {
    const units: number = de.queryAll(By.css('.unit-container')).length;

    expect(units).toBe(2);
  });

  it('should change distance on route change', fakeAsync(() => {
    const prevVal = de.query(By.css('.unit.distance')).nativeElement.innerText;
    TestBed.inject(Router).navigate(['/destination/mars']);
    tick();
    const curVal = de.query(By.css('.unit.distance')).nativeElement.innerText;

    expect(prevVal).not.toBe(curVal);
  }));

  it('should change est time travel on route change', fakeAsync(() => {
    const prevVal = de.query(By.css('.unit.time')).nativeElement.innerText;
    TestBed.inject(Router).navigate(['/destination/mars']);
    tick();
    const curVal = de.query(By.css('.unit.time')).nativeElement.innerText;

    expect(prevVal).not.toBe(curVal);
  }));
});

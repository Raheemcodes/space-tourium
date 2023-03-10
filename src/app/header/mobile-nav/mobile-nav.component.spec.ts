import { TechComponent } from './../../tech/tech.component';
import { CrewComponent } from './../../crew/crew.component';
import { DestinationComponent } from './../../destination/destination.component';
import { HomeComponent } from './../../home/home.component';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef, NgZone } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MobileNavComponent } from './mobile-nav.component';
import { Router, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'destination', component: DestinationComponent },
  { path: 'crew', component: CrewComponent },
  { path: 'tech', component: TechComponent },
];

describe('MobileNavComponent', () => {
  let component: MobileNavComponent;
  let fixture: ComponentFixture<MobileNavComponent>;
  let de: DebugElement;
  let router: Router;
  let zone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileNavComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    router = TestBed.inject(Router);
    zone = TestBed.inject(NgZone);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mobile nav list of four children', () => {
    const mobileNav = de.query(By.css('.mobile-nav__list'));

    expect(mobileNav.children.length).toBe(4);
  });

  it('should have element of class active that contain Home after navigating to /', fakeAsync(() => {
    zone.run(() => router.navigate(['/']));
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.mobile-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('HOME');
  }));

  it('should have element of class active that contain destination after navigating to /destination', fakeAsync(() => {
    zone.run(() => router.navigate(['/destination']));
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.mobile-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('DESTINATION');
  }));

  it('should have element of class active that contain crew after navigating to /crew', fakeAsync(() => {
    zone.run(() => router.navigate(['/crew']));
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.mobile-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('CREW');
  }));

  it('should have element of class active that contain technology after navigating to /tech', fakeAsync(() => {
    zone.run(() => router.navigate(['/tech']));
    tick();

    const navElBtn: ElementRef<HTMLElement> = de.query(
      By.css('.mobile-nav__list-item.active')
    );

    expect(navElBtn.nativeElement.innerText).toContain('TECHNOLOGY');
  }));
});

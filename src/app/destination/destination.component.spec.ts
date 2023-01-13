import { Location } from '@angular/common';
import { DebugElement, ElementRef } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { HomeComponent } from './../home/home.component';
import { DestinationComponent } from './destination.component';

describe('DestinationComponent', () => {
  let component: DestinationComponent;
  let fixture: ComponentFixture<DestinationComponent>;
  let router: Router;
  let location: Location;
  let de: DebugElement;
  let params = new BehaviorSubject<Params>({ id: 'moon' });

  const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'destination/:id',
      component: DestinationComponent,
    },
  ];

  class ActivatedRouteStub {
    params = params;

    constructor() {}
    snapshot = {
      params: { id: 'moon' },
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
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

  describe('router active', () => {
    it('should have element of class active that contain Home after navigating to /', fakeAsync(() => {
      router.navigate(['destination', 'moon']);
      tick();

      const navElBtn: ElementRef<HTMLElement> = de.query(
        By.css('.nav-list__item.active')
      );

      expect(navElBtn.nativeElement.innerText).toContain('MOON');
    }));

    it('should have element of class active that contain Home after navigating to /mars', fakeAsync(() => {
      router.navigate(['destination', 'mars']);
      tick();

      const navElBtn: ElementRef<HTMLElement> = de.query(
        By.css('.nav-list__item.active')
      );

      expect(navElBtn.nativeElement.innerText).toContain('MARS');
    }));

    it('should have element of class active that contain crew after navigating to /europa', fakeAsync(() => {
      router.navigate(['destination', 'europa']);
      fixture.detectChanges();
      tick();

      const navElBtn: ElementRef<HTMLElement> = de.query(
        By.css('.nav-list__item.active')
      );

      expect(navElBtn.nativeElement.innerText).toContain('EUROPA');
    }));

    it('should have element of class active that contain technology after navigating to /titan', fakeAsync(() => {
      router.navigate(['destination', 'titan']);
      tick();

      const navElBtn: ElementRef<HTMLElement> = de.query(
        By.css('.nav-list__item.active')
      );

      expect(navElBtn.nativeElement.innerText).toContain('TITAN');
    }));
  });

  it('should have rotate() add noscroll to the main eleemnt for the span of 300ms', fakeAsync(() => {
    component.rotate('mars');

    const main = de.nativeElement.querySelector('main');

    expect(main.classList.contains('noscroll'))
      .withContext('immediately after call')
      .toBeTrue();
    tick(500);

    expect(main.classList.contains('noscroll'))
      .withContext('300ms after call')
      .toBeFalse();
  }));

  it('should all have celestial body of inactive except the second if deg is 90', () => {
    component.deg = '90';
    fixture.detectChanges();
    const celestial = de.queryAll(By.css('.celestial-body'));

    // active state
    expect(celestial[1].nativeElement.style['opacity'])
      .withContext('second')
      .toBe('1');
    expect(celestial[1].nativeElement.style['transform'])
      .withContext('second')
      .toContain(`scale(1)`);

    // inactive state
    expect(celestial[0].nativeElement.style['opacity'])
      .withContext('first')
      .toBe('0');
    expect(celestial[0].nativeElement.style['transform'])
      .withContext('')
      .toContain(`scale(0.3)`);

    // inactive state
    expect(celestial[2].nativeElement.style['opacity'])
      .withContext('third')
      .toBe('0');
    expect(celestial[2].nativeElement.style['transform'])
      .withContext('')
      .toContain(`scale(0.3)`);

    // inactive state
    expect(celestial[3].nativeElement.style['opacity'])
      .withContext('')
      .toBe('0');
    expect(celestial[3].nativeElement.style['transform'])
      .withContext('fourth')
      .toContain(`scale(0.3)`);
  });

  it('should change celestial parent rotation when deg property changes', () => {
    component.deg = '180';
    fixture.detectChanges();

    const transform: string = de.query(By.css('.celestial-bodies'))
      .nativeElement.style['transform'];

    expect(transform).toEqual(`rotateZ(180deg)`);
  });

  it('should change deg when rotate() invoked with a new argument', () => {
    const deg = component.deg;

    component.rotate('mars');

    expect(deg).not.toBe(component.deg);
  });

  it('should change deg when rotate() invoked with the same new argument', () => {
    const deg = component.deg;

    component.rotate('moon');

    expect(deg).toBe(component.deg);
  });

  it('should call rotate() at route change', fakeAsync(() => {
    const spy = spyOn(component, 'rotate');

    params.next({ id: 'moon' });
    tick(500);

    expect(spy).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));

  it('should change celestial container style rotation based on route', fakeAsync(() => {
    expect(component.deg).withContext('initial').toBe('0');

    params.next({ id: 'mars' });
    tick(500);
    expect(component.deg).withContext('navigated to MARS').toBe('90');

    params.next({ id: 'europa' });
    tick(500);
    expect(component.deg).withContext('navigated to EUROPA').toBe('180');

    params.next({ id: 'titan' });
    tick(500);
    expect(component.deg).withContext('navigated to TITAN').toBe('270');

    params.next({ id: 'moon' });
    tick(500);
    expect(component.deg).withContext('navigated to MOON').toBe('0');

    discardPeriodicTasks();
  }));

  describe('validateParams()', () => {
    it('should call valideParams() on params change', () => {
      const validateParams = spyOn(component, 'validateParams');
      params.next({ id: 'marsll' });

      expect(validateParams).toHaveBeenCalledWith('marsll');
    });

    it('should return false if an invalid argument is passed', () => {
      const validateParams: boolean = component.validateParams('marskfkf');

      expect(validateParams).toBeFalse();
    });

    it('should return true if an invalid argument is passed', () => {
      const validateParams: boolean = component.validateParams('mars');

      expect(validateParams).toBeTrue();
    });

    it('should redirect to home page if an invalid destination id params is entered', fakeAsync(() => {
      router.navigate(['destination', 'marsll']);
      params.next({ id: 'marsll' });
      tick();

      expect(location.path()).toEqual('/');
    }));

    it('should not redirect to home page if a valid destination id params is entered', fakeAsync(() => {
      router.navigate(['destination', 'mars']);
      params.next({ id: 'mars' });
      tick(500);

      expect(location.path()).toEqual('/destination/mars');
      discardPeriodicTasks();
    }));
  });

  it('should have content title that changes based on route', fakeAsync(() => {
    const title = de.query(By.css('.content-title')).nativeElement.textContent;

    router.navigate(['destination', 'moon']);
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(title).withContext('initial').toBe('MOON');
    });

    router.navigate(['destination', 'mars']);
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(title).withContext('navigated to MARS').toBe('MARS');
    });

    router.navigate(['destination', 'europa']);
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(title).withContext('navigated to EUROPA').toBe('EUROPA');
    });

    router.navigate(['destination', 'titan']);
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(title).withContext('navigated to TITAN').toBe('TITAN');
    });
  }));

  it('should have 2 units', () => {
    const units: number = de.queryAll(By.css('.unit-container')).length;

    expect(units).toBe(2);
  });

  it('should change distance on route change', fakeAsync(() => {
    const prevVal = de.query(By.css('.unit.distance')).nativeElement.innerText;
    router.navigate(['destination', 'mars']);
    tick();
    const curVal = de.query(By.css('.unit.distance')).nativeElement.innerText;

    expect(prevVal).not.toBe(curVal);
  }));

  it('should change est time travel on route change', fakeAsync(() => {
    const prevVal = de.query(By.css('.unit.time')).nativeElement.innerText;
    router.navigate(['destination', 'mars']);
    tick();
    const curVal = de.query(By.css('.unit.time')).nativeElement.innerText;

    expect(prevVal).not.toBe(curVal);
  }));
});

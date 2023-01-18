import { Location } from '@angular/common';
import { DebugElement, ElementRef, NgZone } from '@angular/core';
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
import { SharedService } from './../shared/shared.service';
import { CelestialKey } from './dest.model';
import { DestinationComponent } from './destination.component';

describe('DestinationComponent', () => {
  let component: DestinationComponent;
  let fixture: ComponentFixture<DestinationComponent>;
  let router: Router;
  let location: Location;
  let de: DebugElement;
  let params = new BehaviorSubject<Params>({ id: 'moon' });
  let zone: NgZone;
  let sharedService: SharedService;

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
    params: BehaviorSubject<Params> = params;

    constructor() {
      params.subscribe((params) => {
        this.snapshot.params = params;
      });
    }

    snapshot: { params: Params } = {
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
    sharedService = de.injector.get(SharedService);
    location = TestBed.inject(Location);
    zone = TestBed.inject(NgZone);

    zone.run(() => (router = TestBed.inject(Router)));
    zone.run(() => params.next({ id: 'moon' }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(de.query(By.css('.title')).nativeElement.innerText).toBe(
      '01Pick your destination'.toUpperCase()
    );
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
      zone.run(() => router.navigate(['destination', 'moon']));
      tick();

      const navElBtn: ElementRef<HTMLElement> = de.query(
        By.css('.nav-list__item.active')
      );

      expect(navElBtn.nativeElement.innerText).toContain('MOON');
    }));

    it('should have element of class active that contain Home after navigating to /mars', fakeAsync(() => {
      zone.run(() => router.navigate(['destination', 'mars']));
      tick();

      const navElBtn: ElementRef<HTMLElement> = de.query(
        By.css('.nav-list__item.active')
      );

      expect(navElBtn.nativeElement.innerText).toContain('MARS');
    }));

    it('should have element of class active that contain crew after navigating to /europa', fakeAsync(() => {
      zone.run(() => router.navigate(['destination', 'europa']));
      fixture.detectChanges();
      tick();

      const navElBtn: ElementRef<HTMLElement> = de.query(
        By.css('.nav-list__item.active')
      );

      expect(navElBtn.nativeElement.innerText).toContain('EUROPA');
    }));

    it('should have element of class active that contain technology after navigating to /titan', fakeAsync(() => {
      zone.run(() => router.navigate(['destination', 'titan']));
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

  it('should change deg when rotate() invoked with a new argument', fakeAsync(() => {
    params.next({ id: 'moon' });
    tick(500);

    const deg = component.deg;
    component.rotate('mars');

    expect(deg).not.toBe(component.deg);
    discardPeriodicTasks();
  }));

  it('should change deg when rotate() invoked with the same new argument', fakeAsync(() => {
    params.next({ id: 'moon' });
    tick(500);

    const deg = component.deg;
    component.rotate('moon');

    expect(deg).toBe(component.deg);
    discardPeriodicTasks();
  }));

  it('should call rotate() at route change', fakeAsync(() => {
    const spy = spyOn(component, 'rotate');

    zone.run(() => params.next({ id: 'moon' }));
    tick(500);

    expect(spy).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));

  it('should change celestial container style rotation based on route', fakeAsync(() => {
    expect(component.deg).withContext('initial').toBe('0');

    zone.run(() => params.next({ id: 'mars' }));
    tick(500);
    expect(component.deg).withContext('navigated to MARS').toBe('90');

    zone.run(() => params.next({ id: 'europa' }));
    tick(500);
    expect(component.deg).withContext('navigated to EUROPA').toBe('180');

    zone.run(() => params.next({ id: 'titan' }));
    tick(500);
    expect(component.deg).withContext('navigated to TITAN').toBe('270');

    zone.run(() => params.next({ id: 'moon' }));
    tick(500);
    expect(component.deg).withContext('navigated to MOON').toBe('0');

    discardPeriodicTasks();
  }));

  describe('validateParams()', () => {
    it('should call valideParams() on params change', () => {
      const validateParams = spyOn(component, 'validateParams');
      zone.run(() => params.next({ id: 'marsll' }));

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
      zone.run(() => router.navigate(['destination', 'marsll']));
      zone.run(() => params.next({ id: 'marsll' }));
      tick();

      expect(location.path()).toEqual('/');
    }));

    it('should not redirect to home page if a valid destination id params is entered', fakeAsync(() => {
      zone.run(() => router.navigate(['destination', 'mars']));
      zone.run(() => params.next({ id: 'mars' }));
      tick(500);

      expect(location.path()).toEqual('/destination/mars');
      discardPeriodicTasks();
    }));
  });

  it('should have content title that changes based on route', fakeAsync(() => {
    zone.run(() => params.next({ id: 'moon' }));
    tick(5000);
    fixture.detectChanges();
    expect(de.query(By.css('.content-title')).nativeElement.textContent)
      .withContext('initial')
      .toBe('MOON');

    zone.run(() => params.next({ id: 'mars' }));
    tick(5000);
    fixture.detectChanges();
    expect(de.query(By.css('.content-title')).nativeElement.textContent)
      .withContext('navigated to MARS')
      .toBe('MARS');

    zone.run(() => params.next({ id: 'europa' }));
    tick(5000);
    fixture.detectChanges();
    expect(de.query(By.css('.content-title')).nativeElement.textContent)
      .withContext('navigated to EUROPA')
      .toBe('EUROPA');

    zone.run(() => params.next({ id: 'titan' }));
    tick(5000);
    fixture.detectChanges();
    expect(de.query(By.css('.content-title')).nativeElement.textContent)
      .withContext('navigated to TITAN')
      .toBe('TITAN');
  }));

  describe('distance & time', () => {
    it('should have 2 units', () => {
      const units: number = de.queryAll(By.css('.unit-container')).length;
      expect(units).toBe(2);
    });

    it('should change distance on route change', fakeAsync(() => {
      const prevVal = de.query(By.css('.unit.distance')).nativeElement
        .innerText;

      zone.run(() => params.next({ id: 'mars' }));
      tick(500);
      fixture.detectChanges();

      const curVal = de.query(By.css('.unit.distance')).nativeElement.innerText;

      expect(prevVal).not.toBe(curVal);
      discardPeriodicTasks();
    }));

    it('should change est time travel on route change', fakeAsync(() => {
      const prevVal = de.query(By.css('.unit.time')).nativeElement.innerText;

      zone.run(() => params.next({ id: 'mars' }));
      tick(500);
      fixture.detectChanges();

      const curVal = de.query(By.css('.unit.time')).nativeElement.innerText;

      expect(prevVal).not.toBe(curVal);
      discardPeriodicTasks();
    }));
  });

  describe('genInitialCelstialDetails()', () => {
    it('should return details based on route snapshot params', fakeAsync(() => {
      params.next({ id: 'moon' });
      tick(500);

      fixture.detectChanges();
      expect(component.genInitialCelstialDetails('name')).toEqual('MOON');

      params.next({ id: 'mars' });
      tick(500);

      fixture.detectChanges();
      expect(component.genInitialCelstialDetails('name')).toEqual('MARS');

      params.next({ id: 'europa' });
      tick(500);

      fixture.detectChanges();
      expect(component.genInitialCelstialDetails('name')).toEqual('EUROPA');

      params.next({ id: 'titan' });
      tick(500);

      fixture.detectChanges();
      expect(component.genInitialCelstialDetails('name')).toEqual('TITAN');

      discardPeriodicTasks();
    }));

    it('should also return details based on route snapshot argument', fakeAsync(() => {
      const celestial = sharedService.celestialList['moon'];

      params.next({ id: 'moon' });
      tick(500);

      fixture.detectChanges();
      expect(component.genInitialCelstialDetails('name')).toEqual('MOON');

      expect(component.genInitialCelstialDetails('about')).toEqual(
        celestial['about']
      );
      expect(component.genInitialCelstialDetails('distance')).toEqual(
        celestial['distance']
      );
      expect(component.genInitialCelstialDetails('time')).toEqual(
        celestial['time']
      );
      expect(component.genInitialCelstialDetails('deg')).toEqual(
        celestial['deg']
      );

      discardPeriodicTasks();
    }));

    it('should return empty string if params is invalid', fakeAsync(() => {
      params.next({ id: 'moonrlg' });
      tick(500);

      fixture.detectChanges();
      expect(component.genInitialCelstialDetails('name')).toEqual('');

      discardPeriodicTasks();
    }));
  });

  describe('changeContent()', () => {
    it('should be called after component route params change', fakeAsync(() => {
      const spyFn = spyOn(component, 'changeContent');
      params.next({ id: 'mars' });
      tick(5000);

      expect(spyFn).toHaveBeenCalledTimes(3);
    }));

    it('should change loopable key passed to it after a maximum of five seconds', fakeAsync(() => {
      const prev: string = sharedService.celestialList.moon.distance;
      const cur: string = sharedService.celestialList.mars.distance;

      component.name = 'MOON'.split('');

      component.changeContent('mars', 'name');
      tick(5000);

      expect(component.name.join('')).withContext('name').toBe('MARS');

      component.distance = prev.split('');

      component.changeContent('mars', 'distance');
      tick(5000);

      expect(component.distance.join('')).withContext('distance').toBe(cur);
    }));

    it('should change letters per interval based on the new string', fakeAsync(() => {
      component.name = 'MOON'.split('');

      component.changeContent('mars', 'name');
      tick(100);

      expect(component.name.join('')).withContext('name').toBe('MNPO');
      discardPeriodicTasks();
    }));
  });

  describe('changeLetter()', () => {
    it('should change be called when changeContent() is invoked', () => {
      const spyFn = spyOn(component, 'changeLetter');

      component.changeContent('mars', 'name');

      expect(spyFn).toHaveBeenCalled();
    });

    it('should change indexed letter of the selected component field based arguments passed', fakeAsync(() => {
      const key: CelestialKey = 'name';
      const idx: number = 0;
      component[key] = 'MOON'.split('');

      component.changeLetter(key, 'europa', idx);
      tick(100);

      expect(component[key][idx]).toEqual('L');
      discardPeriodicTasks();
    }));

    it('should loop backward if indexed letter of the selected component field is lessed than the new', fakeAsync(() => {
      const key: CelestialKey = 'name';
      const idx: number = 0;
      component[key] = 'MOON'.split('');

      component.changeLetter(key, 'europa', idx);
      tick(100);

      expect(component[key][idx]).toEqual('L');
      discardPeriodicTasks();
    }));

    it('should loop forward if indexed letter of the selected component field is lessed than the new', fakeAsync(() => {
      const key: CelestialKey = 'name';
      const idx: number = 0;
      component[key] = 'MOON'.split('');

      component.changeLetter(key, 'titan', idx);
      tick(100);

      expect(component[key][idx]).toEqual('N');
      discardPeriodicTasks();
    }));
  });
});

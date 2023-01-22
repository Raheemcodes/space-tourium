import { NgOptimizedImage } from '@angular/common';
import { DebugElement, ElementRef } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { interval, timer } from 'rxjs';

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

  it('should unsubscibe from timer and interval OnDestroy', fakeAsync(() => {
    component.timer = [
      timer(250).subscribe(() => {}),
      timer(750).subscribe(() => {}),
      timer(250).subscribe(() => {}),
      timer(750).subscribe(() => {}),
    ];
    component.interval = interval(750).subscribe(() => {});

    let spyFnTimer: jasmine.Spy[] = [];
    const spyFnInterval: jasmine.Spy = spyOn(
      component['interval'],
      'unsubscribe'
    );

    component.timer.forEach((sub, idx) => {
      spyFnTimer[idx] = spyOn(sub, 'unsubscribe');
    });

    component.ngOnDestroy();

    spyFnTimer.forEach((el: jasmine.Spy, idx: number) => {
      expect(el).withContext(`timer idx: ${idx}`).toHaveBeenCalledTimes(1);
    });
    expect(spyFnInterval).withContext('interval').toHaveBeenCalledTimes(1);

    discardPeriodicTasks();
  }));

  describe('changeSlide()', () => {
    let paginations: DebugElement[];
    beforeEach(() => {
      paginations = de.queryAll(By.css('.pagination'));
    });

    it('should be called on pagination click', () => {
      const idx: number = 1;
      const spyFn: jasmine.Spy = spyOn(component, 'changeSlide');
      paginations[idx].triggerEventHandler('click');

      expect(spyFn).toHaveBeenCalledOnceWith(idx);
    });

    it('should unsubscribe from timer immediately after invoked', fakeAsync(() => {
      component.timer = [
        timer(250).subscribe(() => {}),
        timer(750).subscribe(() => {}),
      ];

      let spyFn: jasmine.Spy[] = [];
      component.timer.forEach((sub, idx) => {
        spyFn[idx] = spyOn(sub, 'unsubscribe');
      });
      component.changeSlide(1);

      spyFn.forEach((el: jasmine.Spy, idx: number) => {
        expect(el).withContext(`idx: ${idx}`).toHaveBeenCalledTimes(1);
      });

      discardPeriodicTasks();
    }));

    it('should not unsubscribe from timer immediately after invoked if isAnimating is true', fakeAsync(() => {
      component.isAnimating = true;
      component.timer = [
        timer(750).subscribe(() => {}),
        timer(750).subscribe(() => {}),
      ];

      let spyFn: jasmine.Spy[] = [];
      component.timer.forEach((sub, idx) => {
        spyFn[idx] = spyOn(sub, 'unsubscribe');
      });
      component.changeSlide(1);

      spyFn.forEach((el: jasmine.Spy, idx: number) => {
        expect(el).withContext(`idx: ${idx}`).not.toHaveBeenCalled();
      });

      discardPeriodicTasks();
    }));

    it('should unsubscribe from interval immediately after invoked', () => {
      component.interval = interval(750).subscribe(() => {});

      const spyFn: jasmine.Spy = spyOn(component['interval'], 'unsubscribe');
      component.changeSlide(1);

      expect(spyFn).toHaveBeenCalledTimes(1);
    });

    it('should not unsubscribe from interval immediately after invoked if isAnimating is true', () => {
      component.isAnimating = true;
      component.interval = interval(750).subscribe(() => {});

      const spyFn: jasmine.Spy = spyOn(component['interval'], 'unsubscribe');
      component.changeSlide(1);

      expect(spyFn).not.toHaveBeenCalled();
    });

    it('should store `curIdx` value in `prevIdx`', () => {
      const curIdx: number = 3;
      component.curIdx = curIdx;

      component.changeSlide(1);

      expect(component.prevIdx).toBe(curIdx);
    });

    it('should not store `curIdx` value in `prevIdx` if isAnimating is true', () => {
      component.isAnimating = true;
      const curIdx: number = 3;
      component.curIdx = curIdx;

      component.changeSlide(1);

      expect(component.prevIdx).not.toBe(curIdx);
    });

    it('should call loop() immediately invoked', () => {
      const spyFn: jasmine.Spy = spyOn(component, 'loop');
      component.changeSlide(1);

      expect(spyFn).toHaveBeenCalledTimes(1);
    });

    it('should not call loop() immediately invoked if isAnimating is true', () => {
      component.isAnimating = true;
      const spyFn: jasmine.Spy = spyOn(component, 'loop');
      component.changeSlide(1);

      expect(spyFn).not.toHaveBeenCalled();
    });

    it('should set curIdx as the value passed as argument after 250ms', fakeAsync(() => {
      const idx: number = 2;
      component.curIdx = 1;

      component.changeSlide(idx);

      tick(250);
      expect(component.curIdx).withContext('250ms after invoking').toEqual(idx);

      discardPeriodicTasks();
    }));

    it('should not set curIdx as the value passed as argument after 250ms if isAnimating is true', fakeAsync(() => {
      component.isAnimating = true;
      const idx: number = 2;
      component.curIdx = 1;

      component.changeSlide(idx);

      tick(250);
      expect(component.curIdx)
        .withContext('250ms after invoking')
        .not.toEqual(idx);

      discardPeriodicTasks();
    }));

    it('should set `isAnimating` to false after 750ms', fakeAsync(() => {
      expect(component.isAnimating).withContext('initial').toBeFalse();

      component.changeSlide(1);

      expect(component.isAnimating)
        .withContext('immediately after invoking')
        .toBeTrue();

      tick(750);
      expect(component.isAnimating)
        .withContext('750ms after invoking')
        .toBeFalse();

      discardPeriodicTasks();
    }));
  });

  describe('loop()', () => {
    describe('isAnimating is false', () => {
      beforeEach(() => {
        component.isAnimating = false;
      });

      it('should be called after changeSlide() has been invoked', () => {
        const spyFn: jasmine.Spy = spyOn(component, 'loop');
        component.changeSlide(2);
        expect(spyFn).toHaveBeenCalledTimes(1);
      });

      it('should unsubscribe from timer', () => {
        component.timer = [
          timer(250).subscribe(() => {}),
          timer(750).subscribe(() => {}),
        ];

        let spyFn: jasmine.Spy[] = [];
        component.timer.forEach((sub, idx) => {
          spyFn[idx] = spyOn(sub, 'unsubscribe');
        });

        component.changeSlide(2);

        component.timer.forEach((sub, idx) => {
          expect(spyFn[idx])
            .withContext(`timer idx: ${idx}`)
            .toHaveBeenCalled();
        });
      });

      it('should value of `curIDx` in `prevIdx`', () => {
        const curIdx: number = 3;
        component.curIdx = curIdx;

        component.changeSlide(1);

        expect(component.prevIdx).toBe(curIdx);
      });

      it('should set isAnimating to true then to false after 750ms', fakeAsync(() => {
        expect(component.isAnimating).withContext('initial').toBeFalse();

        component.changeSlide(1);

        expect(component.isAnimating)
          .withContext('immediately after invoking')
          .toBeTrue();

        tick(750);
        expect(component.isAnimating)
          .withContext('750ms after invoking')
          .toBeFalse();

        discardPeriodicTasks();
      }));

      it('should increment `curIdx` by 1 after 250ms every 7s interval', fakeAsync(() => {
        let curIdx: number = 1;
        component.curIdx = curIdx;
        component.loop();

        tick(7250);
        expect(component.curIdx).withContext('first').toBe(++curIdx);

        tick(7250);
        expect(component.curIdx).withContext('second').toBe(++curIdx);
        discardPeriodicTasks();
      }));

      it('should set `curIdx` to 0 if curIdx last idx of the crew Obj', fakeAsync(() => {
        let curIdx: number = component.crew.length - 1;
        component.curIdx = curIdx;
        component.loop();

        tick(7250);
        expect(component.curIdx).withContext('first').toBe(0);

        discardPeriodicTasks();
      }));
    });

    describe('isAnimating is true', () => {
      beforeEach(() => {
        component.isAnimating = true;
      });

      it('should be called after changeSlide() has been invoked', () => {
        const spyFn: jasmine.Spy = spyOn(component, 'loop');
        component.changeSlide(2);
        expect(spyFn).not.toHaveBeenCalledTimes(1);
      });

      it('should not unsubscribe from timer', () => {
        component.timer = [
          timer(250).subscribe(() => {}),
          timer(750).subscribe(() => {}),
        ];

        let spyFn: jasmine.Spy[] = [];
        component.timer.forEach((sub, idx) => {
          spyFn[idx] = spyOn(sub, 'unsubscribe');
        });

        component.changeSlide(2);

        component.timer.forEach((sub, idx) => {
          expect(spyFn[idx])
            .withContext(`timer idx: ${idx}`)
            .not.toHaveBeenCalled();
        });
      });

      it('should not unsubscribe from `curIdx` in `prevIdx`', () => {
        const curIdx: number = 3;
        component.curIdx = curIdx;

        component.changeSlide(1);

        expect(component.prevIdx).not.toBe(curIdx);
      });

      it('should not set isAnimating to true then to false after 750ms', fakeAsync(() => {
        expect(component.isAnimating).withContext('initial').toBeTrue();

        component.changeSlide(1);

        expect(component.isAnimating)
          .withContext('immediately after invoking')
          .toBeTrue();

        tick(750);
        expect(component.isAnimating)
          .withContext('750ms after invoking')
          .toBeTrue();

        discardPeriodicTasks();
      }));

      it('should not increment `curIdx` after 250ms every 7s interval', fakeAsync(() => {
        const curIdx: number = 1;
        component.curIdx = curIdx;
        component.loop();

        tick(7250);
        expect(component.curIdx).withContext('first').toBe(curIdx);

        tick(7250);
        expect(component.curIdx).withContext('second').toBe(curIdx);
        discardPeriodicTasks();
      }));

      it('should not set `curIdx` to 0 if curIdx last idx of the crew Obj', fakeAsync(() => {
        let curIdx: number = component.crew.length - 1;
        component.curIdx = curIdx;
        component.loop();

        tick(7250);
        expect(component.curIdx)
          .withContext('first')
          .toBe(component.crew.length - 1);

        discardPeriodicTasks();
      }));
    });
  });

  describe('fadeIn -> fadeOut animation', () => {
    it('should have .crew-img__container element with class active', () => {
      const crewEl = de.query(By.css('.crew-img__container.active'));

      expect(crewEl).toBeTruthy();
    });

    it('should have element with .active in respect to curIdx', () => {
      const idx = 1;
      component.curIdx = idx;

      fixture.detectChanges();

      const crewImg = de.queryAll(By.css('.crew-img__container'));
      const crewContent = de.queryAll(By.css('.crew-content'));
      const pagination = de.queryAll(By.css('.pagination'));

      expect(crewImg[idx].classes['active']).withContext('img').toBeTrue();
      expect(crewContent[idx].classes['active'])
        .withContext('content')
        .toBeTrue();
      expect(pagination[idx].classes['active'])
        .withContext('pagination')
        .toBeTrue();
    });

    it('should have element with .inactive in respect to prevIdx', () => {
      const idx = 1;
      component.prevIdx = idx;

      fixture.detectChanges();

      const crewImg = de.queryAll(By.css('.crew-img__container'));
      const crewContent = de.queryAll(By.css('.crew-content'));

      expect(crewImg[idx].classes['inactive']).withContext('img').toBeTrue();
      expect(crewContent[idx].classes['inactive'])
        .withContext('content')
        .toBeTrue();
    });
  });
});

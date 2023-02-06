import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ElementRef } from '@angular/core';
import { TechComponent } from './tech.component';
import { By } from '@angular/platform-browser';

describe('TechComponent', () => {
  let component: TechComponent;
  let fixture: ComponentFixture<TechComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechComponent],
      providers: [{ provide: 'Window', useValue: window }],
    }).compileComponents();

    fixture = TestBed.createComponent(TechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(de.query(By.css('.title')).nativeElement.innerText).toBe(
      '03SPACE LAUNCH 101'.toUpperCase()
    );
  });

  it('should have tech image of three', () => {
    const crew: ElementRef<HTMLElement>[] = de.queryAll(By.css('.tech-img'));

    expect(crew.length).toBe(3);
  });

  it('should have pagination of three', () => {
    const crew: ElementRef<HTMLElement>[] = de.queryAll(By.css('.pagination'));

    expect(crew.length).toBe(3);
  });

  it('should have term of three', () => {
    const pos: ElementRef<HTMLElement>[] = de.queryAll(By.css('.term'));

    expect(pos.length).toBe(3);
  });

  it('should have name of three', () => {
    const name: ElementRef<HTMLElement>[] = de.queryAll(By.css('.name'));

    expect(name.length).toBe(3);
  });

  it('should have desc of three', () => {
    const desc: ElementRef<HTMLElement>[] = de.queryAll(By.css('.desc'));

    expect(desc.length).toBe(3);
  });

  describe('paginate()', () => {
    it('should be called on pagination click', () => {
      const crew: DebugElement[] = de.queryAll(By.css('.pagination'));

      const spyFn = spyOn(component, 'paginate');

      crew.forEach((el) => {
        el.triggerEventHandler('click');
      });

      expect(spyFn).toHaveBeenCalledTimes(3);
    });

    it('should have idx property of default value 0', () => {
      expect(component.idx).toEqual(0);
    });

    it('should have argument relative to index of pagination clicked', () => {
      const index: number = 2;

      const crew: DebugElement[] = de.queryAll(By.css('.pagination'));

      crew[2].triggerEventHandler('click');

      expect(component.idx).toEqual(index);
    });

    it('should switch active pagination in respect to idx', () => {
      const index: number = 2;

      const crew: DebugElement[] = de.queryAll(By.css('.pagination'));

      crew[index].triggerEventHandler('click');

      fixture.detectChanges();

      crew.forEach((el, idx) => {
        if (idx == index) {
          expect(el.classes['active']).toBeTrue();
        } else {
          expect(el.classes['active']).toBeFalsy();
        }
      });
    });

    it('should change component property idx based on argument', () => {
      const index: number = 1;
      component.paginate(index);

      expect(component.idx).toEqual(index);
    });

    it('should have property screenWidth relative to screensize onresize', () => {
      expect(component.screenWidth).toEqual(innerWidth);

      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));

      fixture.detectChanges();

      expect(component.screenWidth).toEqual(500);
    });
  });

  it('should have idx relative to img list translation if screenWidth < 1440', () => {
    component.screenWidth = 1300;
    component.idx = 1;
    fixture.detectChanges();

    const imgList: DebugElement = de.query(By.css('.tech-img__list'));

    expect(imgList.styles['transform']).toEqual(
      `translate(-${component.idx * 100}%, 0%)`
    );
  });

  it('should have idx relative to content list translation if screenWidth < 1440', () => {
    component.screenWidth = 1300;
    component.idx = 1;
    fixture.detectChanges();

    const imgList: DebugElement = de.query(By.css('.tech-content__list'));

    expect(imgList.styles['transform']).toEqual(
      `translate(-${component.idx * 100}%, 0%)`
    );
  });

  it('should have idx relative to img list translation if screenWidth >= 1440', () => {
    component.screenWidth = 1440;
    component.idx = 1;
    fixture.detectChanges();

    const imgList: DebugElement = de.query(By.css('.tech-img__list'));

    expect(imgList.styles['transform']).toEqual(
      `translate(0%, -${component.idx * 100}%)`
    );
  });

  it('should have idx relative to content list translation if screenWidth >= 1440', () => {
    component.screenWidth = 1440;
    component.idx = 1;
    fixture.detectChanges();

    const imgList: DebugElement = de.query(By.css('.tech-content__list'));

    expect(imgList.styles['transform']).toEqual(
      `translate(0%, -${component.idx * 100}%)`
    );
  });
});

import { MobileNavComponent } from './header/mobile-nav/mobile-nav.component';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HeaderComponent, MobileNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have headerComponent', () => {
    const de = fixture.debugElement;

    expect(de.query(By.css('app-header'))).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgOptimizedImage } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrewComponent } from './crew/crew.component';
import { DestinationComponent } from './destination/destination.component';
import { FadeDirective } from './fade.directive';
import { HeaderComponent } from './header/header.component';
import { MobileNavComponent } from './header/mobile-nav/mobile-nav.component';
import { HomeComponent } from './home/home.component';
import { TechComponent } from './tech/tech.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationComponent,
    CrewComponent,
    TechComponent,
    HeaderComponent,
    MobileNavComponent,
    // FadeDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

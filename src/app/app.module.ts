import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DestinationComponent } from './destination/destination.component';
import { CrewComponent } from './crew/crew.component';
import { TechComponent } from './tech/tech.component';
import { HeaderComponent } from './header/header.component';
import { MobileNavComponent } from './header/mobile-nav/mobile-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationComponent,
    CrewComponent,
    TechComponent,
    HeaderComponent,
    MobileNavComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { TechComponent } from './tech/tech.component';
import { CrewComponent } from './crew/crew.component';
import { DestinationComponent } from './destination/destination.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'destination', component: DestinationComponent },
  { path: 'crew', component: CrewComponent },
  { path: 'tech', component: TechComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

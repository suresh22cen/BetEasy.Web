import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RacesComponent } from "./races/races.component"
import { RaceService } from '../services/race-service';
import { CommonModule } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RacesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,    
    HttpClientModule,
    FormsModule, 
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', component: RacesComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    RaceService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

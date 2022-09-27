import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core";
import { TimeComponent } from './components/time/time.component';
import { GreetingComponent } from './components/greeting/greeting.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MusicComponent } from './components/music/music.component'
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const COMPONENTS = [
  TimeComponent,
  GreetingComponent,
  QuotesComponent,
  WeatherComponent,
  MusicComponent,
]

// const DIRECTIVES = [

// ]

@NgModule({
  declarations: [
    COMPONENTS,
    // DIRECTIVES,
  ],
  exports: [
    CommonModule,
    COMPONENTS,
    FontAwesomeModule
    // DIRECTIVES,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ]
})

export class SharedModule {}

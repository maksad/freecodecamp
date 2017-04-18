import { HomeComponent } from './home/home.component';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ApiService } from './shared';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { SimonComponent } from './simon/simon.compnent';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    CalculatorComponent,
    HomeComponent,
    PomodoroComponent,
    TicTacToeComponent,
    SimonComponent
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

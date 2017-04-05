import { RouterModule, Routes } from '@angular/router';

import { CalculatorComponent } from './calculator/calculator.component';
import { HomeComponent } from './home/home.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { SimonComponent } from './simon/simon.compnent';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'pomodoro', component: PomodoroComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'simon', component: SimonComponent },
];

export const routing = RouterModule.forRoot(routes);

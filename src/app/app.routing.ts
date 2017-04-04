import { RouterModule, Routes } from '@angular/router';

import { CalculatorComponent } from './calculator/calculator.component';
import { HomeComponent } from './home/home.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'pomodoro', component: PomodoroComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
];

export const routing = RouterModule.forRoot(routes);

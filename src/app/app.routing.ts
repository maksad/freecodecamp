import { RouterModule, Routes } from '@angular/router';

import { CalculatorComponent } from './calculator/calculator.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculator', component: CalculatorComponent },
];

export const routing = RouterModule.forRoot(routes);

import { RouterModule, Routes } from '@angular/router';

import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  { path: '', component: CalculatorComponent },
];

export const routing = RouterModule.forRoot(routes);

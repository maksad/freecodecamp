import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Calculator');
  }
}

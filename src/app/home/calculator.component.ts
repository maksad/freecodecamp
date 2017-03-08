import { Component } from '@angular/core';

@Component({
  selector: 'my-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent{
  public stack = [];
  public current = '';

  addToStack(char: string) {
    this.stack.push(char);
    this.current += char;
  }

  removeTheLast() {
    if (this.stack.length > 0) {
      this.stack.pop();
    }
    this.current = '';
  }

  empty() {
    this.stack = [];
    this.current = '';
  }

  displaySequence(arr: any[]): any {
    if (arr.length > 0) {
      return arr.join('');
    }
    return 0;
  }
}

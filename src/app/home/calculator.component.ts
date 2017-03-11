import { Component } from '@angular/core';

@Component({
  selector: 'my-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  public stack = [];
  public current = '';
  public firstNum = '';
  public operation = '';
  public result = '';
  private listOfOperations = ['%', '/', '+', '-', '*'];

  appendChar(char: string) {
    if (
      this._isSymbol(this.current) ||
      !this._isSymbol(this.current) && this.current === '0'
    ) {
      this.current = '';
    }

    if (this.result !== '') {
      this.empty();
    }

    if (10 > this.current.length && this.current.length > 0) {
      this.current = this.current.concat(char);
    } else if (this.current.length === 0 && char !== '0') {
      this.current = char;
    } else if (this.firstNum !== '' && char === '0') {
      this.current = char;
    }
  }

  addOperation(char: string) {
    if (this.operation !== '' && this._isSymbol(char) && this.current === '') {
      this.operation = char;
      this.current = char;
    }

    if (this._isSymbol(char) && this.current === '' && this.result === '') {
      return;
    }

    if (this.isOperationAfterCalc()) {
      this.current = this.result;
      this.result = '';
    }

    if (this.firstNum === '' && this.operation === '' && this._isSymbol(char) && !this._isSymbol(this.current)) {
      this.firstNum = this.current;
      this.current = char;
      this.operation = char;
    } else {
      if (!this._isSymbol(this.current)) {
        this.calculate();
      }
    }
  }

  calculate() {
    const sequence = [this.firstNum, this.operation, this.current].join('');
    // tslint:disable-next-line:no-eval
    let res = eval(sequence);
    res = this.isFloat(res) ? Number((res).toFixed(8)) : res;
    this.result = String(res);

    this.partialEmpty();
  }

  calculatePercent() {
    if (this.current !== '') {
      this.result = String(Number(this.current) / 100);
      this.partialEmpty();
    }
  }

  validateAndCalculate() {
    if (this.firstNum !== '' && this.operation !== '' && this.current !== '') {
      this.calculate();
    }
  }

  partialEmpty() {
    this.current = '';
    this.firstNum = '';
    this.operation = '';
  }

  empty() {
    this.partialEmpty();
    this.result = '';
  }

  resetCurrent() {
    this.current = '';
  }

  displaySequence(arr: any[]): any {
    if (arr.length > 0) {
      return arr.join('');
    }
    return 0;
  }

  isOperationAfterCalc() {
    return this.firstNum === '' && this.operation === '' && this.current === '' && this.result !== '';
  }

  _isSymbol(char): boolean {
    if (this.listOfOperations.indexOf(char) > 0) {
      return true;
    }
    return false;
  }

  isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }
}

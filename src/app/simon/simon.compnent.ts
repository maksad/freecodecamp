import { Component } from '@angular/core';

@Component({
  selector: 'my-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.scss']
})
export class SimonComponent {
  public gameIsOff = true;
  public isClickable = false;
  public isStrict = false;
  public steps = [];
  public status = 'progress';
  public userSteps = [];
  public isOn = false;

  power(): void {
    this.resetAll();
    this.isOn = this.isOn === true ? false : true;
  }

  start(): void {
    if (this.isOn) {
      this.resetOnStart();
      this.setNextStep();
    }
  }

  resetOnStart(): void {
    this.isClickable = false;
    this.steps = [];
    this.status = 'progress';
    this.userSteps = [];
  }

  resetAll(): void {
    this.gameIsOff = true;
    this.isClickable = false;
    this.isStrict = false;
    this.steps = [];
    this.status = 'progress';
    this.userSteps = [];
    this.isOn = false;
  }

  setNextStep(): void {
    if (this.steps.length === 4) {
      this.status = 'victory';
    }

    if (this.status === 'progress' || this._isNotStrictMode()) {
      this.isClickable = true;
      const nextStep = this.getNextStep();
      this.steps.push(nextStep);
    }
  }

  getNextStep(): number {
    const combinations = [1, 2, 3, 4];
    return combinations.sort(() => .5 - Math.random())[0];
  }

  takeStep(step): void {
    if (this.isClickable) {
      if (this.steps[this.userSteps.length] === step) {
        this.userSteps.push(step);
        this.status = 'progress';

        if (this.userSteps.length === this.steps.length) {
          this.userSteps = [];
          this.isClickable = false;
          this.setNextStep();
        }
      } else {
        this.status = 'mistake';
        this.userSteps = [];
        this.isClickable = true;

        if (this.isStrict) {
          setTimeout(() => this.start(), 1500);
        }
      }
    }
  }

  toggleStrict(): void {
    if (this.isOn) {
      this.isStrict = this.isStrict === true ? false : true;
    }
  }

  _isNotStrictMode(): boolean {
    return this.status === 'progress' && !this.isStrict;
  }
}

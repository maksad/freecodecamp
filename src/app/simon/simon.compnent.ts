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
    this.removeAllActiveClasses();
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

  removeAllActiveClasses(): void {
    const elements = document.body.querySelectorAll('.circle-button.active');
    elements.forEach(element => {
      element.classList.remove('active');
    });
  }

  setNextStep(): void {
    if (this.steps.length === 20) {
      this.status = 'victory';
    }

    if (this.status === 'progress' || this._isNotStrictMode()) {
      this.isClickable = true;
      const nextStep = this.getNextStep();
      this.steps.push(nextStep);
      this.uiFlickerButton();
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
          setTimeout(() => this.setNextStep(), 1000);
        }
      } else {
        this.status = 'mistake';
        this.userSteps = [];
        this.removeAllActiveClasses();
        this.isClickable = false;

        if (this.isStrict) {
          setTimeout(() => this.start(), 1000);
        } else {
          setTimeout(() => {
            this.uiFlickerButton();
          }, 500, this);
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

  uiFlickerButton(): void {
    const that = this;
    let counter = 0;
    this.isClickable = false;

    function next() {
      if (counter < that.steps.length) {
        setTimeout(() => {
          that.flickerElement(that.steps[counter++]).then(next);
        }, 400);
      } else if (counter >= that.steps.length) {
        that.isClickable = true;
      }
    }
    next();
  }

  flickerElement(index: any) {
    const element = document.getElementById(index);
    return new Promise((resolve) => {
      element.classList.add('active');

      setTimeout(() => {
        element.classList.remove('active');
        resolve();
      }, 1000);
    });
  }
}

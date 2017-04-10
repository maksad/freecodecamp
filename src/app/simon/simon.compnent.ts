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
    if (this.steps.length === 4) {
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
          setTimeout(() => this.setNextStep(), 1500);
        }
      } else {
        this.status = 'mistake';
        this.userSteps = [];

        if (this.isStrict) {
          setTimeout(() => this.start(), 1500);
        } else {
          setTimeout(() => {
            this.uiFlickerButton();
            this.isClickable = true;
          }, 1000, this);
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
    const length = this.steps.length;
    let index = 0;
    const that = this;
    let removeActiveClassInterval = null;

    const interval = setInterval(() => {
      clearInterval(removeActiveClassInterval);

      if (index > length) {
        that.removeActiveClass(that.steps[index - 1]);
        clearInterval(interval);
      } else {
        if (index - 1 >= 0 ) {
          removeActiveClassInterval = setInterval(
            () => that.removeActiveClass(that.steps[index - 1]),
            800
          );
        }

        that.addActiveClass(that.steps[index]);
        index++;
      }

    }, 1000);
  }

  addActiveClass(id: any): void {
    const element = document.getElementById(id);
    element.classList.add('active');
  }

  removeActiveClass(id: any): void {
    const element = document.getElementById(id);
    element.classList.remove('active');
  }

  clearAllIntervals(intervals: any[]) {
    intervals.forEach(interval => {
      clearInterval(interval);
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'my-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent {
  public breakTime = 5;
  public sessionTime = 25;
  public countDownTimer = 0;

  reduceBreakTime() {
    if (this.breakTime > 1) {
      this.breakTime -= 1;
    }
  }

  increaseBreakTime() {
    this.breakTime += 1;
  }

  reduceSessionTime() {
    if (this.sessionTime > 1) {
      this.sessionTime -= 1;
    }
  }

  increaseSessionTime() {
    this.sessionTime += 1;
  }

  startCountDown(sessionT: number, breakT: number) {
    console.log(sessionT, breakT);
  }
}

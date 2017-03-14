import { Component } from '@angular/core';

@Component({
  selector: 'my-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent {
  public breakTime = 2;
  public sessionTime = 1;
  public countDownTimer = '01:00';
  private clockStatus = 'paused';
  private intervalId: any;

  reduceBreakTime() {
    if (this.breakTime > 1 && this.clockStatus === 'paused') {
      this.breakTime -= 1;
    }
  }

  increaseBreakTime() {
    if (this.clockStatus === 'paused') {
      this.breakTime += 1;
    }
  }

  reduceSessionTime() {
    if (this.clockStatus === 'paused') {
      if (this.sessionTime > 1) {
        this.sessionTime -= 1;
      }
      this._setCountDownTimer(this.sessionTime);
    }
  }

  increaseSessionTime() {
    if (this.clockStatus === 'paused') {
      this.sessionTime += 1;
      this._setCountDownTimer(this.sessionTime);
    }
  }

  startCountDown(sessionTime: number, breakTime: number) {
    let minutes = sessionTime;
    let seconds = 0;
    let process = 'session';
    const that = this;

    this.clockStatus = this._getClockStatus();
    if (this.clockStatus === 'ticking') {
      this.intervalId = setInterval(startTimer, 1000);
    } else {
      clearInterval(this.intervalId);
    }

    function startTimer() {
      if (minutes === 0 && seconds === 0) {
        if (process === 'session') {
          process = 'break';
          minutes = breakTime;
        } else {
          minutes = sessionTime;
          process = 'session';
        }
      }

      const dt = new Date();
      dt.setHours(0);
      dt.setMinutes(minutes);
      dt.setSeconds(seconds);

      const dt2 = new Date(dt.valueOf() - 1000);
      const temp = dt2.toTimeString().split(' ');
      const ts = temp[0].split(':');
      minutes = dt2.getMinutes();
      seconds = dt2.getSeconds();

      that.countDownTimer = ts[1] + ':' + ts[2];
    }
  }

  _getClockStatus() {
    return this.clockStatus === 'paused' ? 'ticking' : 'paused';
  }

  _setCountDownTimer(mins: number) {
    const minutes = mins < 10 ? '0' + String(mins) : mins;
    this.countDownTimer = minutes + ':' + '00';
  }
}

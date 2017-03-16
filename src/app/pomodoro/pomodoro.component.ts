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
  private initialValues = {break: 2, session: 1};
  private clockStatus = 'paused';
  private intervalId: any;
  public cycles = 0;
  public fillPercentage = 0;
  public process = 'session';

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

  startCountDown(current: string, sessionTime: number, breakTime: number) {
    let minutes = sessionTime;
    let seconds = 0;

    if (this._valuesChanged(sessionTime, breakTime)) {
      this.initialValues.session = sessionTime;
      this.initialValues.session = breakTime;
    } else {
      minutes = Number(current.split(':')[0]);
      seconds = Number(current.split(':')[1]);
    }

    this.clockStatus = this._getClockStatus();
    if (this.clockStatus === 'ticking') {
      this.intervalId = setInterval(startTimer.bind(this), 1000);
    } else {
      clearInterval(this.intervalId);
    }

    function startTimer() {
      if (minutes === 0 && seconds === 0) {
        if (this.process === 'session') {
          this.process = 'break';
          minutes = breakTime;
          this.cycles += 1;
        } else {
          minutes = sessionTime;
          this.process = 'session';
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

      this.countDownTimer = ts[1] + ':' + ts[2];
      this.fillPercentage = this._getFillPercentage(
        this.process === 'session' ? sessionTime * 60 : breakTime * 60,
        Number(ts[1]) * 60 + Number(ts[2])
      );
    }
  }

  counter(num: number): number[] {
    const arr = [];
    for (let index = 0; index < num; index++) {
      arr.push(index);
    }
    return arr;
  }

  _getClockStatus() {
    return this.clockStatus === 'paused' ? 'ticking' : 'paused';
  }

  _setCountDownTimer(mins: number) {
    const minutes = mins < 10 ? '0' + String(mins) : mins;
    this.countDownTimer = minutes + ':' + '00';
  }

  _valuesChanged(sessionTime, breakTime): boolean {
    return sessionTime !== this.initialValues.session ||
      breakTime !== this.initialValues.break;
  }

  _getFillPercentage(total: number, current: number): number {
    const result = 100 - (current * 100) / total;
    return Math.round(result);
  }
}

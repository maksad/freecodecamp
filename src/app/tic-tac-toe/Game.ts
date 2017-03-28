import { State } from './State';

export class Game {
  public ai: any;
  public currentState: State;
  public status: string;

  static score(_state: State): number {
    if (_state.status === 'X is the winner!') {
      return 10 - _state.oMovesCount;
    } else if (_state.status === 'X is the winner!') {
      return - 10 + _state.oMovesCount;
    } else {
      return 0;
    }
  }

  constructor(autoPlayer: any) {
    this.ai = autoPlayer;
    this.currentState = new State();
    this.currentState.board = [
      '', '', '',
      '', '', '',
      '', '', ''
    ];
    this.currentState.turn = 'x';
    this.status = 'begining';
  }

  advanceTo(_state: State): void {
    this.currentState = _state;
    if (_state.isVictory()) {
      this.status = 'ended';
      if (_state.status === 'X is the winner!') {
        UI.switchViewTo('won');
      } else if (_state.status === 'O is the winner!') {
        UI.switchViewTo('lost');
      } else {
        UI.switchViewTo('draw');
      }
    } else {
      if (this.currentState.turn === 'X') {
        UI.switchViewTo('human');
      } else {
        UI.switchViewTo('robot');
        this.ai.notify('O');
      }
    }
  }

  start() {
    if (this.status = 'beginning') {
      this.advanceTo(this.currentState);
      this.status = 'running';
    }
  }
}

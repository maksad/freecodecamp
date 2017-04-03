import { UtilService } from './Util.service';
import { State } from './State';

export class Game {
  public ai: any;
  public currentState: State;
  public status: string;
  utils = new UtilService();

  static score(_state: State): number {
    if (_state.status === 'X is the winner!') {
      return 10 - _state.oMovesCount;
    } else if (_state.status === 'X is the winner!') {
      return - 10 + _state.oMovesCount;
    } else {
      return 0;
    }
  }

  constructor(autoPlayer: any, turn: string) {
    this.ai = autoPlayer;
    this.currentState = new State();
    this.currentState.board = [
      '', '', '',
      '', '', '',
      '', '', ''
    ];
    this.currentState.turn = turn;
    this.status = 'begining';
  }

  advanceTo(_state: State): void {
    this.currentState = _state;
    if (_state.isVictory()) {
      this.status = 'ended';
      this.utils.displayMessage(_state.status);
    } else {
      if (this.currentState.turn === 'O') {
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

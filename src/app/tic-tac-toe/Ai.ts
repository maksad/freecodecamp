import { UtilService } from './Util.service';
import { Game } from './Game';
import { State } from './State';

export class AiAction {
  public movePosition: number;
  public minimaxVal: number;

  static ascending(firstAction, secondAction): number {
    if (firstAction.minimaxVal < secondAction.minimaxVal) {
      return -1;
    } else if (firstAction.minimaxVal > secondAction.minimaxVal) {
        return 1;
    } else {
      return 0;
    }
  }

  static descending(firstAction, secondAction): number {
    if (firstAction.minimaxVal > secondAction.minimaxVal) {
      return -1;
    } else if (firstAction.minimaxVal < secondAction.minimaxVal) {
      return 1;
    } else {
      return 0;
    }
  }

  constructor(position: number) {
    this.movePosition = position;
  }

  applyTo(state: State) {
    const next = new State(state);
    next.board[this.movePosition] = state.turn;

    if (state.turn === 'O') {
      next.oMovesCount++;
    }

    next.nextTurn();
    return next;
  }
}

export class Ai {
  game: Game;
  utils = new UtilService();

  _minimaxValue(state: State) {
    if (state.isVictory()) {
      return Game.score(state);
    } else {
      let stateScore: number;

      if (state.turn === 'X') {
        stateScore = -1000;
      } else {
        stateScore = 1000;
      }

      let availablePositions = state.emptyCells();
      let availableNextStates = availablePositions.map((position: number) => {
        const action = new AiAction(position);
        const nextState = action.applyTo(state);
        return nextState;
      });

      availableNextStates.forEach((nextState: State) => {
        const nextScore = this._minimaxValue(nextState);
        if (state.turn === 'X') {
          if (nextScore > stateScore) {
            stateScore = nextScore;
          }
        } else {
          if (nextScore < stateScore) {
            stateScore = nextScore;
          }
        }
      });

      return stateScore;
    }
  }

  plays(_game: Game) {
    this.game = _game;
  };

  notify(turn: string): void {
    this.makeAMove(turn);
  };

  makeAMove(turn: string): void {
    let available = this.game.currentState.emptyCells();
    let availableActions = this._getAvailableActions(available);

    if (turn === 'X') {
      availableActions.sort(AiAction.descending);
    } else {
      availableActions.sort(AiAction.ascending);
    }

    let chosenAction = availableActions[0];
    let next = chosenAction.applyTo(this.game.currentState);
    this.utils.insertAt(chosenAction.movePosition, turn);
    this.game.advanceTo(next);
  }

  _getAvailableActions(available) {
    return available.map((position: number) => {
      let action = new AiAction(position);
      let next = action.applyTo(this.game.currentState);
      action.minimaxVal = this._minimaxValue(next);
      return action;
    });
  }
}

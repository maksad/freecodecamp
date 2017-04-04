import { UtilService } from './Util.service';
import { State } from './State';
import { Ai } from './Ai';
import { Game } from './Game';
import { Component } from '@angular/core';

@Component({
  selector: 'my-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  game: Game;
  ai: Ai;
  utils = new UtilService();
  public tableIsVisible = false;
  public aiSymbol = 'O';
  public playerSymbol = 'X';

  setPlayerSymbol(symbol: string): void {
    const turn = this._getTurn(symbol);
    this._setSymbols(symbol);

    this.tableIsVisible = true;
    let ai = new Ai();
    this.game = new Game(ai, turn, this.playerSymbol, this.aiSymbol);
    ai.plays(this.game);

    this.game.start();
  }

  makeAMove(event: any, index: number) {
    const element = event.target;
    if (
      this.game.status === 'running' &&
      this.game.currentState.turn === 'player' &&
      !element.innerHTML
    ) {
      const next = new State(this.game.currentState);
      next.board[index] = 'player';
      this.utils.insertAt(index, this.game.playerSymbol);
      next.nextTurn();
      this.game.advanceTo(next);
    }
  }

  restart() {
    this.tableIsVisible = false;
    this.utils.clearTheTable();
  }

  _getTurn(symbol: string) {
    return symbol === 'X' ? 'player' : 'ai';
  }

  _setSymbols(symbol: string) {
    if (symbol === 'X') {
      this.playerSymbol = 'X';
      this.aiSymbol = 'O';
    } else {
      this.playerSymbol = 'O';
      this.aiSymbol = 'X';
    }
  }
}

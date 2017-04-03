import { UtilService } from './Util.service';
import { State } from './State';
import { Ai } from './Ai';
import { Game } from './Game';
import { Component} from '@angular/core';

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

  setPlayerSymbol(symbol: string): void {
    debugger
    this.tableIsVisible = true;
    let ai = new Ai();
    this.game = new Game(ai, symbol);
    ai.plays(this.game);

    this.game.start();
  }

  makeAMove(event: any, index: number) {
    const element = event.target;
    if (
      this.game.status === 'running' &&
      this.game.currentState.turn === 'X' &&
      !element.innerHTML
    ) {
      const next = new State(this.game.currentState);
      next.board[index] = 'X';
      this.utils.insertAt(index, 'X');
      next.nextTurn();
      this.game.advanceTo(next);
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  private table: any[];
  public symbol = 'x';
  public turn = 'x';
  public boardArray = [];
  public currentBoard = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: ''
  };

  ngOnInit() {
    this.table = document.querySelectorAll('td');
  }

  makeAMove(event: any, position: number, symbol = 'x') {
    const element = event.target;
    if (element.textContent === '') {
      this.boardArray.push(symbol);
      this.currentBoard[position] = symbol;
      this.drawSymbol();

      setTimeout(this.computerMakeAMove(), 2000);
    }
  }

  computerMakeAMove() {
    const position = this.getNextMovePostion();
    this.currentBoard[position] = 'o';
    this.boardArray.push('o');

    this.drawSymbol();
  }

  getNextMovePostion() {
    if (this.currentBoard[5] === '') {
      return 5;
    }
  }

  drawSymbol() {
    const currentBoard = this.currentBoard;
    this.table.forEach((element, index) => {
      if (element.textContent === '' && currentBoard[index + 1] !== '') {
        element.textContent = currentBoard[index + 1];
      }
    })
    this.toggleTurn();
  }

  toggleTurn() {
    this.turn = this.turn === 'x' ? 'o' : 'x';
  }

  restart() {
    const elems = document.querySelectorAll('td');
    elems.forEach((elem) => elem.textContent = '');
    this.symbol = 'x';
    this.turn = 'x';
  }
}

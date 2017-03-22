import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'my-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  public turn = 'x';

  private table = [];
  private positionsX = [];
  private positionsO = [];
  private currentBoard = {
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
  private combinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [1, 5, 9],
    [3, 6, 9],
    [3, 5, 7]
  ];

  ngOnInit() {
    document.querySelectorAll('td').forEach(elem => this.table.push(elem));
  }

  makeAMove(event: any, position: number): void {
    const element = event.target;
    if (element.textContent === '') {
      this.positionsX.push(position);
      this.currentBoard[position] = 'x';
      this.drawTheBoard();

      setTimeout(this.computerMakeAMove.bind(this), 1000);
    }
  }

  computerMakeAMove() {
    const possibleXCombos = this._getPossibleCombos(
      this.positionsX,
      this.positionsO
    );
    const dangerousCombos = this._getDangerousCombos(
      possibleXCombos,
      this.positionsX
    );
    let position: number;

    if (
      dangerousCombos.length === 0 ||
      this._getOpotentialPositions().length > 0
    ) {
      position = this._getAttachPosition();
    } else {
      position = this._getNextMovePostion(dangerousCombos);
    }

    this.currentBoard[position] = 'o';
    this.positionsO.push(position);

    this.drawTheBoard();
  }

  _getAttachPosition() {
    if (this.currentBoard[5] === '') {
      return 5;
    } else if (this.currentBoard[5] === 'x') {
      return 1;
    } else {
      const potentialPositions = this._getOpotentialPositions();
      const position = potentialPositions[0].filter(
        value => !_.contains(this.positionsO, value)
      );
      return position[0];
    }
  }

  _getOpotentialPositions(): any[] {
    const possibleOCombos = this._getPossibleCombos(
      this.positionsO,
      this.positionsX
    );
    const dangerousCombos = this._getDangerousCombos(
      possibleOCombos,
      this.positionsO
    );

    return dangerousCombos;
  }

  _getPossibleCombos(defierPositions, confronterPositions): any[] {
    const that = this;
    const defierCombos = this.combinations.filter(combination => {
      return that._hasCommonPosition(combination, defierPositions);
    });

    const possibleCombos = defierCombos.filter(combination => {
      return !that._hasCommonPosition(combination, confronterPositions);
    });

    return possibleCombos;
  }

  _hasCommonPosition(combination, postions): boolean {
    const positionsSet = new Set(postions);
    const intersection = combination.filter(value => {
      return positionsSet.has(value);
    });
    return intersection.length !== 0;
  }

  _getDangerousCombos(combos: any[], positions: number[]): any[] {
    if (positions.length > 1) {
      const dangerousCombos = combos.filter(combo => {
        const inters = _.intersection(combo, positions);
        return inters.length === 2;
      });
      return dangerousCombos;
    } else {
      return [];
    }
  }

  _getNextMovePostion(combos: any[]) {
    if (combos.length > 0) {
      const positions = combos[0].filter(
        value => !_.contains(this.positionsX, value)
      );
      return positions[0];
    }
  }

  drawTheBoard() {
    const currentBoard = this.currentBoard;
    this.table.forEach((element, index) => {
      if (element.textContent === '' && currentBoard[index + 1] !== '') {
        element.textContent = currentBoard[index + 1];
      }
    });
    this.toggleTurn();
  }

  toggleTurn() {
    this.turn = this.turn === 'x' ? 'o' : 'x';
  }

  restart() {
    this._resetCurrentBoard();
    this._clearTheBoard();
    this.turn = 'x';
  }

  _resetCurrentBoard() {
    this.currentBoard = {
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
  }

  _clearTheBoard() {
    const elems = document.querySelectorAll('td');
    elems.forEach((elem) => elem.textContent = '');
  }
}

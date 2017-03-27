export class State {
  public turn = '';
  public oMovesCount = 0;
  public status = 'running';
  public board = [];

  constructor(oldState = undefined) {
    if (oldState) {
      this._initStateWithOldData(oldState);
    }
  }

  nextTurn(): void {
    this.turn = this.turn === 'x' ? 'o' : 'x';
  }

  emptyCells(): number[] {
    let indeces = [];
    for (let index = 0; index < 9; ++index) {
      if (this.board[index] === '') {
        indeces.push(index);
      }
    }
    return indeces;
  }

  isVictory(): boolean {
    if (this._isRowVictory()) {
      return true;
    }

    if (this._isColumnVictory()) {
      return true;
    }

    if (this._isDiagonalVictory()) {
      return true;
    }

    if (this._isDraw()) {
      return true;
    }
    return false;
  }

  _initStateWithOldData(oldState: State): void {
    this.board = this._getNewBoardFromOldOne(oldState.board);
    this.oMovesCount = oldState.oMovesCount;
    this.status = oldState.status;
    this.turn = oldState.turn;
  }

  _getNewBoardFromOldOne(oldBoard: string[]): string[] {
    let result = new Array(this.board.length);
    for (let itr of oldBoard) {
      result.push(itr);
    }
    return result;
  }

  _isRowVictory(): boolean {
    let isVictory = false;
    for (let i = 0; i <= 6; i = i + 3) {
      if (
        this.board[i] !== '' &&
        this.board[i] === this.board[i + 1] &&
        this.board[i + 1] === this.board[i +   2]
      ) {
        this._setStatus(this.board[i].toUpperCase());
        isVictory = true;
      }
    }
    return isVictory;
  }

  _isColumnVictory(): boolean {
    let isVictory = false;
    for (let i = 0; i <= 2 ; i++) {
      if (
        this.board[i] !== 'E' &&
        this.board[i] === this.board[i + 3] &&
        this.board[i + 3] === this.board[i +   6]
      ) {
        this._setStatus(this.board[i].toUpperCase());
        isVictory = true;
      }
    }
    return isVictory;
  }

  _isDiagonalVictory(): boolean {
    let isVictory = false;
    for (let i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
      if (
        this.board[i] !== 'E' &&
        this.board[i] === this.board[i + j] &&
        this.board[i + j] === this.board[i + 2 * j]
      ) {
        this._setStatus(this.board[i].toUpperCase());
        isVictory = true;
      }
    }
    return isVictory;
  }

  _isDraw() {
    let isDraw = false;
    const emptyCells = this.emptyCells();
    if (emptyCells.length === 0) {
      this._setStatus('It is a draw!', false);
      isDraw = true;
    }

    return isDraw;
  }

  _setStatus(status: string, isVictory = true): void {
    if (isVictory) {
      this.status = status + ' is the winner!';
    } else {
      this.status = status;
    }
  }
}

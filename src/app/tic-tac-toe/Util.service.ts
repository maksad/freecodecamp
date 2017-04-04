export class UtilService {
  displayMessage(message: string): void {
    const element = document.body.querySelector('#message');
    element.innerHTML = message.toUpperCase();
  }

 insertAt(index: number, symbol: string): void {
    const board = document.body.querySelectorAll('td');
    const targetCell = board[index];
    if (!targetCell.innerHTML) {
      targetCell.textContent = symbol;
      targetCell.classList.add(symbol === 'O' ? 'o-symbol' : 'x-symbol');
    }
  }

  clearTheTable() {
    this._clearTheBoard();
    this._clearTheMessage();
  }

  _clearTheMessage() {
    const message = document.body.querySelector('#message');
    message.innerHTML = '';
  }

  _clearTheBoard() {
    const board = document.body.querySelectorAll('td');
    for (let b of board) {
      b.innerHTML = '';

      if (b.hasAttribute('class')) {
        b.attributes.removeNamedItem('class');
      }
    }
  }
}

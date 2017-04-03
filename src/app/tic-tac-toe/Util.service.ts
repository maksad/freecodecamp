export class UtilService {
  displayMessage(message: string): void {
    const element = document.body.querySelector('#message');
    element.innerHTML = message;
  }

 insertAt(index: number, symbol: string): void {
    const board = document.body.querySelectorAll('td');
    const targetCell = board[index];
    if (!targetCell.innerHTML) {
      targetCell.textContent = symbol;
      targetCell.classList.add(symbol === 'O' ? 'o-symbol' : 'x-symbol');
    }
  }
}

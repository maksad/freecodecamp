import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  ngOnInit() {
    console.log('THIS IS ON INIT')
  }
}

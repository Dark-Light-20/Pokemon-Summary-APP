import { Component, OnInit } from '@angular/core';
import { GameList } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  private readonly _offset = 20;
  private _actualPage = 1;
  private _gameList: GameList[] = [];

  get actualPage(): number {
    return this._actualPage;
  }

  get isLastPage(): boolean {
    return this._actualPage === Math.ceil(this._gameList.length / this._offset);
  }

  games: GameList[] = [];

  constructor(private _gameService: GameService) {}

  ngOnInit(): void {
    this._gameService
      .getListData()
      .pipe(take(1))
      .subscribe((data) => {
        this._gameList = data;
        this.changePage(this._actualPage);
      });
  }

  changePage(page: number): void {
    this._actualPage = page;
    const startIndex = (this._actualPage - 1) * this._offset;
    const endIndex = startIndex + this._offset;
    this.games = this._gameList.slice(startIndex, endIndex);
  }
}

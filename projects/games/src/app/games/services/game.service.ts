import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameGroup, GameList, GameListRS } from '../models/game.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly _API = 'https://pokeapi.co/api/v2';
  private readonly _endpoint = 'version-group';
  /*
  Theorically there aren't more than 30 pokemon games until now, so
  this limit will work for many years. And the PokeApi response with this limit
  is answered in less than a second.
  */
  private readonly _limit = 100;

  constructor(private _http: HttpClient) {}

  getListData(): Observable<GameList[]> {
    const endpoint = `${this._API}/${this._endpoint}`;
    return this._http
      .get<GameListRS>(endpoint, {
        params: { limit: this._limit },
      })
      .pipe(
        map((response) =>
          response.results.map((item, index) => ({
            name: item.name.replaceAll('-', ' '),
            id: (index + 1).toString(),
          }))
        )
      );
  }

  getGameGroup(id: number): Observable<GameGroup> {
    const endpoint = `${this._API}/${this._endpoint}/${id}`;
    return this._http.get<GameGroup>(endpoint);
  }
}

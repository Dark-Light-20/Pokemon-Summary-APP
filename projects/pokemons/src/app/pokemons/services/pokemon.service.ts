import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pokemon, PokemonList, PokemonListRS } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly _API = 'https://pokeapi.co/api/v2';
  private readonly _endpoint = 'pokemon';
  /*
  Theorically there aren't more than 1100 pokemons until now, so
  this limit will work for many years. And the PokeApi response with this limit
  is answered in less than a second.
  */
  private readonly _limit = 10000;

  constructor(private _http: HttpClient) {}

  getListData(): Observable<PokemonList[]> {
    const endpoint = `${this._API}/${this._endpoint}`;
    return this._http
      .get<PokemonListRS>(endpoint, {
        params: { limit: this._limit },
      })
      .pipe(
        map((response) =>
          response.results.map((item, index) => ({
            name: item.name,
            id: (index + 1).toString(),
          }))
        )
      );
  }

  getPokemon(id: number): Observable<Pokemon> {
    const endpoint = `${this._API}/${this._endpoint}/${id}`;
    return this._http.get<Pokemon>(endpoint);
  }
}

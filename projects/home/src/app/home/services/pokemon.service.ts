import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly _API = 'https://pokeapi.co/api/v2';
  private readonly _pokemonEndpoint = 'pokemon';
  // Last index as Aug 2023...
  private readonly _lastIndex = 1010;

  constructor(private _http: HttpClient) {}

  getRandomPokemon(): Observable<Pokemon> {
    const randIndex = Math.floor(Math.random() * this._lastIndex) + 1;
    const endpoint = `${this._API}/${this._pokemonEndpoint}/${randIndex}`;
    return this._http.get<Pokemon>(endpoint).pipe(delay(1000));
  }
}

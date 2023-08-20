import { Component, OnInit } from '@angular/core';
import { Pokemon } from './models/pokemon.model';
import { MOCK_POKEMON } from './utils/mocks/pokemon.mock';
import { PokemonService } from './services/pokemon.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  projectTitle = 'PokeSummary Project';

  private _pokemon$!: Observable<Pokemon>;

  get pokemon$(): Observable<Pokemon> {
    return this._pokemon$;
  }

  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this._pokemon$ = this._pokemonService.getRandomPokemon();
  }
}

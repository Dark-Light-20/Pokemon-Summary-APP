import { Component, OnInit } from '@angular/core';
import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './services/pokemon.service';
import { Observable } from 'rxjs';

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

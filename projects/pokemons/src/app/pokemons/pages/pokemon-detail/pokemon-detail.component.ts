import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemon: Pokemon | undefined;

  private _destroySubject$ = new Subject<void>();

  constructor(
    private _activeRoute: ActivatedRoute,
    private _pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this._activeRoute.params
      .pipe(
        takeUntil(this._destroySubject$),
        switchMap((params) =>
          this._pokemonService.getPokemon(parseInt(params['id']))
        )
      )
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }

  ngOnDestroy(): void {
    this._destroySubject$.next();
    this._destroySubject$.complete();
  }
}

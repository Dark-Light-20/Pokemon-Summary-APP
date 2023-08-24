import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonList } from '../../models/pokemon.model';
import { take } from 'rxjs';
import { SharedLibService } from 'shared-lib';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  private readonly _offset = 20;
  private _actualPage = 1;
  private _pokemonList: PokemonList[] = [];

  get actualPage(): number {
    return this._actualPage;
  }

  get isLastPage(): boolean {
    return (
      this._actualPage === Math.ceil(this._pokemonList.length / this._offset)
    );
  }

  pokemons: PokemonList[] = [];

  constructor(
    private _pokemonService: PokemonService,
    private _sharedLib: SharedLibService
  ) {}

  ngOnInit(): void {
    this._pokemonService
      .getListData()
      .pipe(take(1))
      .subscribe((data) => {
        this._pokemonList = data;
        this.changePage(this._actualPage);
      });
    console.log(this._sharedLib.dummyUUID);
  }

  changePage(page: number): void {
    this._actualPage = page;
    const startIndex = (this._actualPage - 1) * this._offset;
    const endIndex = startIndex + this._offset;
    this.pokemons = this._pokemonList.slice(startIndex, endIndex);
  }
}

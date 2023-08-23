import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent],
  imports: [CommonModule, PokemonsRoutingModule, HttpClientModule],
})
export class PokemonsModule {}

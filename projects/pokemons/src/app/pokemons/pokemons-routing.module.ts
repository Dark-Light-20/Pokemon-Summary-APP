import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PokemonListComponent,
      },
      {
        path: 'detail/:id',
        component: PokemonDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonsRoutingModule {}

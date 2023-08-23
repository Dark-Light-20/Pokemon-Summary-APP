import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'home',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'home',
        exposedModule: './HomeModule',
      }).then((m) => m.HomeModule),
  },
  {
    path: 'pokemons',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'pokemons',
        exposedModule: './PokemonsModule',
      }).then((m) => m.PokemonsModule),
  },
  {
    path: 'games',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'games',
        exposedModule: './GamesModule',
      }).then((m) => m.GamesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

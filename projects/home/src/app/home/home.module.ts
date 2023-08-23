import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RandomPokemonComponent } from './components/random-pokemon/random-pokemon.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, RandomPokemonComponent],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule],
  exports: [HomeComponent],
})
export class HomeModule {}

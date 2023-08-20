import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RandomPokemonComponent } from './components/random-pokemon/random-pokemon.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent, RandomPokemonComponent],
  imports: [CommonModule, RouterModule.forChild([]), HttpClientModule],
  exports: [HomeComponent],
})
export class HomeModule {}

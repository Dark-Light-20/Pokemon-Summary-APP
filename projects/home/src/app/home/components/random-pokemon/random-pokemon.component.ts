import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-random-pokemon',
  templateUrl: './random-pokemon.component.html',
  styleUrls: ['./random-pokemon.component.scss'],
})
export class RandomPokemonComponent {
  @Input() pokemon!: Pokemon | null;

  readonly preloadImgSrc = '/assets/images/preload-pokemon-sprite.png';
}

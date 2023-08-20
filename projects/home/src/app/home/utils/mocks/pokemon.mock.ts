import { Pokemon } from '../../models/pokemon.model';

export const MOCK_POKEMON: Pokemon = {
  base_experience: 112,
  height: 4,
  id: 25,
  is_default: true,
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/25/encounters',
  name: 'pikachu',
  order: 35,
  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
  },
  sprites: {
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    back_female:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png',
    back_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png',
    back_shiny_female:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png',
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    front_female:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png',
    front_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
    front_shiny_female:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png',
  },
  stats: [],
  types: [],
  weight: 60,
};

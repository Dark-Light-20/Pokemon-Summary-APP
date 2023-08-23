import { GameGroup } from '../../models/game.model';

export const GAME_MOCK: GameGroup = {
  generation: {
    name: 'generation-i',
    url: 'https://pokeapi.co/api/v2/generation/1/',
  },
  id: 1,
  move_learn_methods: [
    { name: 'level-up', url: 'https://pokeapi.co/api/v2/move-learn-method/1/' },
    { name: 'machine', url: 'https://pokeapi.co/api/v2/move-learn-method/4/' },
    {
      name: 'stadium-surfing-pikachu',
      url: 'https://pokeapi.co/api/v2/move-learn-method/5/',
    },
  ],
  name: 'red-blue',
  order: 1,
  pokedexes: [{ name: 'kanto', url: 'https://pokeapi.co/api/v2/pokedex/2/' }],
  regions: [{ name: 'kanto', url: 'https://pokeapi.co/api/v2/region/1/' }],
  versions: [
    { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
    { name: 'blue', url: 'https://pokeapi.co/api/v2/version/2/' },
  ],
};

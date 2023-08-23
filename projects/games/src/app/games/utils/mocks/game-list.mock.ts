import { GameList, GameListRS } from '../../models/game.model';

export const GAME_LIST_RS_MOCK: GameListRS = {
  count: 27,
  next: 'https://pokeapi.co/api/v2/version-group?offset=20&limit=7',
  previous: null,
  results: [
    { name: 'red-blue', url: 'https://pokeapi.co/api/v2/version-group/1/' },
    { name: 'yellow', url: 'https://pokeapi.co/api/v2/version-group/2/' },
    { name: 'gold-silver', url: 'https://pokeapi.co/api/v2/version-group/3/' },
    { name: 'crystal', url: 'https://pokeapi.co/api/v2/version-group/4/' },
    {
      name: 'ruby-sapphire',
      url: 'https://pokeapi.co/api/v2/version-group/5/',
    },
    { name: 'emerald', url: 'https://pokeapi.co/api/v2/version-group/6/' },
    {
      name: 'firered-leafgreen',
      url: 'https://pokeapi.co/api/v2/version-group/7/',
    },
    {
      name: 'diamond-pearl',
      url: 'https://pokeapi.co/api/v2/version-group/8/',
    },
    { name: 'platinum', url: 'https://pokeapi.co/api/v2/version-group/9/' },
    {
      name: 'heartgold-soulsilver',
      url: 'https://pokeapi.co/api/v2/version-group/10/',
    },
    { name: 'black-white', url: 'https://pokeapi.co/api/v2/version-group/11/' },
    { name: 'colosseum', url: 'https://pokeapi.co/api/v2/version-group/12/' },
    { name: 'xd', url: 'https://pokeapi.co/api/v2/version-group/13/' },
    {
      name: 'black-2-white-2',
      url: 'https://pokeapi.co/api/v2/version-group/14/',
    },
    { name: 'x-y', url: 'https://pokeapi.co/api/v2/version-group/15/' },
    {
      name: 'omega-ruby-alpha-sapphire',
      url: 'https://pokeapi.co/api/v2/version-group/16/',
    },
    { name: 'sun-moon', url: 'https://pokeapi.co/api/v2/version-group/17/' },
    {
      name: 'ultra-sun-ultra-moon',
      url: 'https://pokeapi.co/api/v2/version-group/18/',
    },
    {
      name: 'lets-go-pikachu-lets-go-eevee',
      url: 'https://pokeapi.co/api/v2/version-group/19/',
    },
    {
      name: 'sword-shield',
      url: 'https://pokeapi.co/api/v2/version-group/20/',
    },
  ],
};

export const GAME_LIST_MOCK: GameList[] = GAME_LIST_RS_MOCK.results.map(
  (game, index) => ({
    name: game.name,
    id: (index + 1).toString(),
  })
);

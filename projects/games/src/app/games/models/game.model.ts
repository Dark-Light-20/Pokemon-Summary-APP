export interface Item {
  name: string;
  url: string;
}

export interface GameList {
  id: string;
  name: string;
}

export interface GameListRS {
  count: number;
  next: string | null;
  previous: string | null;
  results: Item[];
}

export interface GameGroup {
  generation: Item;
  id: number;
  move_learn_methods: Item[];
  name: string;
  order: number;
  pokedexes: Item[];
  regions: Item[];
  versions: Item[];
}

export interface Item {
  name: string;
  url: string;
}

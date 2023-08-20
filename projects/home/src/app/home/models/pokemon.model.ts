export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  location_area_encounters: string;
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
}

export interface Species {
  name: string;
  url: string;
}

export interface PastType {
  generation: Species;
  types: Type[];
}

export interface Type {
  slot: number;
  type: Species;
}

export interface Sprites {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
  animated?: Sprites;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

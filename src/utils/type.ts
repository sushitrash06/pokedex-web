export interface Types {
    type: {
      name: string
      url: string
    }
  }
  export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonHeadDetail {
    name: string;
    url: string;
    color: string;
    navigation?: any;
    types?: Types[]
  }
  export interface UrlImage {
    imageUrl: string[],
    color?: string
  }
  
  export interface Stats {
    base_stat: number
    stat: Pokemon
  }
  
  export interface Abilities {
    ability: Pokemon,
    is_hidden:boolean
  }
  
  
  export interface AbilitiesPage {
    abilities: Abilities[],
    stats: Stats[]
  }
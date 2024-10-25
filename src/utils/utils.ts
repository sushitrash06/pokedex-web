import axios from 'axios';
import { Pokemon } from './type';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getIdPokemon = (url: string): string => {
  const parts = url.split("/");
  return parts[parts.length - 2]
};


export const getPokemonUrlImage = (url: string): string => {
  const id = getIdPokemon(url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return imageUrl
};

export const filterPokemonByName = (pokemonList:Pokemon[], name:string) => {
  return pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));
};

export const fetchPokemonSearch = async (keyword: string, type: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon?offset=0&limit=10000`);
      const data = response.data.results;
  
      // Filter by name first
      const filteredByName = filterPokemonByName(data, keyword);
  
      // If a type is selected, further filter by type
      if (type) {
        const filteredByType = await Promise.all(
          filteredByName.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url);
            return pokemonData.data.types.some((t:any) => t.type.name === type) ? pokemon : null;
          })
        );
  
        // Remove any null values from the filtered results
        return filteredByType.filter(Boolean);
      }
  
      return filteredByName;
    } catch (error) {
      throw new Error('Failed to fetch data from the server');
    }
  };


export const fetchPokemonTypes = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    return data.results.map((type: { name: string }) => type.name); // Map to get an array of type names
  };
  
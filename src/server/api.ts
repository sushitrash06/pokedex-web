import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (offset: number, limit: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch data from the server');
  }
};

export const fetchPokemonSpecies = async (id:number) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from the server');
  }
};

export const fetchPokemonDetail = async (id:number) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from the server');
  }
};

export const fetchAbilities = async (id:number) => {
  try {
    const response = await axios.get(`${BASE_URL}/ability/${id}`);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch data from the server');
  }
};

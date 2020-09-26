const api = 'https://pokeapi.co/api/v2';

export const urlRegion = () => `${api}/region`;
export const urlRegionById = (id) => `${api}/region/${id}`;
export const urlPokemonByName = (name) => `${api}/pokemon/${name}`;
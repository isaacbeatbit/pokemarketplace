import { Query, SpecificPokemonData, TPokemon } from '../types'

export function handleSetLocalStorage({
  pokemons,
  offset,
  limit
}: Query & { pokemons: Array<TPokemon> }) {
  const pokemonsData = {
    pokemons,
    offset,
    limit
  }

  const stringfyData = JSON.stringify(pokemonsData)

  localStorage.setItem('POKEMONS', stringfyData)
}

export function handleGetLocalStorage({
  localStoragePokemons
}: {
  localStoragePokemons: string
}): SpecificPokemonData {
  const parsedData: SpecificPokemonData = JSON.parse(localStoragePokemons)
  return parsedData
}

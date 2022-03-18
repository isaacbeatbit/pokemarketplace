import { useEffect, useState } from 'react'
import { SpecificPokemonData, Query, SimplePokemons, TPokemon } from '../types'
import { getPokemon, getPokemons } from '../lib/fetch'
import {
  handleGetLocalStorage,
  handleSetLocalStorage
} from '../lib/localstorage'

export function usePokemons({ limit, offset }: Query): Array<TPokemon> | null {
  const [pokemons, setPokemons] = useState<null | Array<TPokemon>>(null)

  async function handleDataPokemons(): Promise<void> {
    console.log('🧲 FETCHING DATA 🧲')
    const simplePokemons: SimplePokemons = await getPokemons({
      limit,
      offset
    })

    const { results } = simplePokemons

    const pokemonsPromises = results.map(async ({ url }) => {
      const singlePokemon: TPokemon = await getPokemon({ url })
      const { abilities, id, name, sprites, types } = singlePokemon
      return {
        abilities,
        id,
        name,
        sprites,
        types
      }
    })

    const pokemonsData: Array<TPokemon> = await Promise.all(pokemonsPromises)

    setPokemons(pokemonsData)

    handleSetLocalStorage({ pokemons: pokemonsData, offset, limit })
  }

  function handleLocalStoragePokemonData({
    pokemons
  }: {
    pokemons: SpecificPokemonData
  }) {
    if (limit === pokemons.limit && offset === pokemons.offset) {
      console.log('💾 GETTING THE DATA FROM LS 💾')
      setPokemons(pokemons.pokemons)
    } else {
      handleDataPokemons()
    }
  }

  useEffect(() => {
    const localStoragePokemons = localStorage.getItem('POKEMONS')

    if (localStoragePokemons) {
      const pokemons: SpecificPokemonData = handleGetLocalStorage({
        localStoragePokemons
      })
      handleLocalStoragePokemonData({ pokemons })
    }
    if (!localStoragePokemons) {
      handleDataPokemons()
    }
  }, [offset, limit])

  return pokemons
}

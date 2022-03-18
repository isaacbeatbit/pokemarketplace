import { Query, TPokemon } from '../types'

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

export async function getPokemons({ offset, limit }: Query) {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`

  const res = await fetch(url, options)

  return await res.json()
}

export async function getPokemon({ url }: { url: string }): Promise<TPokemon> {
  const res = await fetch(url, options)

  return await res.json()
}

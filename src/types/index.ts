export type Query = {
  offset: number
  limit: number
}

export type SimplePokemon = {
  name: string
  url: string
}

export type SimplePokemons = {
  results: Array<SimplePokemon>
}

export type TType = {
  type: {
    name: string
  }
}

type Ability = {
  ability: {
    name: string
  }
}

export type TPokemon = {
  abilities: Array<Ability>
  id: number
  name: string
  sprites: any
  types: Array<TType>
}

export type SpecificPokemonData = {
  limit: number
  offset: number
  pokemons: Array<TPokemon>
}

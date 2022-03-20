export type Query = {
  offset: number
  limit: number
}

export type TType = {
  name: string
}

type Ability = {
  name: string
}

export type TPokemon = {
  abilities: Array<Ability>
  id: number
  name: string
  image: string
  types: Array<TType>
  stars: number
}

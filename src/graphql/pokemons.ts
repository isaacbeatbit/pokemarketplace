import { gql } from '@apollo/client'

export const POKEMONS = gql`
  query pokemons($input: PokemonsInput!) {
    pokemons(input: $input) {
      abilities {
        name
      }
      id
      image
      name
      stars
      types {
        name
      }
    }
  }
`

export const LIKE_COUNT = gql`
  subscription likeCount($name: String!) {
    likeCount(name: $name) {
      id
      name
      stars
    }
  }
`

export const DO_LIKE = gql`
  mutation doLike($name: String!) {
    doLike(name: $name)
  }
`

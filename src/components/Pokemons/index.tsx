import { Query, TPokemon } from '../../types'
import { useQuery } from '@apollo/client'
import { POKEMONS } from '../../graphql/pokemons'
import Card from './Card'
import { cache } from '../../apollo/client'
import layout from '../../scss/utils/layout.module.scss'
import styles from './scss/main.module.scss'
import Pagination from './Pagination'

const containerClasses = layout.container + ' ' + styles.container
const contentClasses = layout.content + ' ' + styles.content

function Pokemons({ limit, offset }: Query) {
  const pokemonsCache = cache.readQuery({
    query: POKEMONS,
    variables: {
      input: {
        limit,
        offset
      }
    }
  })

  const { loading, error, data, refetch } = useQuery(POKEMONS, {
    variables: {
      input: {
        limit,
        offset
      }
    },
    onCompleted: data => {
      console.log('🧲🧲🧲🧲🧲🧲', data)
      cache.writeQuery({
        query: POKEMONS,
        data,
        variables: {
          input: {
            limit,
            offset
          }
        }
      })
    },
    skip: Boolean(pokemonsCache)
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! ${error.message}</div>

  const { pokemons } = pokemonsCache || data

  return (
    <main className={containerClasses}>
      <div className={contentClasses}>
        <Pagination limit={limit} offset={offset} />
        <div className={styles.cards}>
          {pokemons.map((pokemon: TPokemon) => (
            <Card refetch={refetch} {...pokemon} key={pokemon.id} />
          ))}
        </div>
        <Pagination limit={limit} offset={offset} />
      </div>
    </main>
  )
}

export default Pokemons

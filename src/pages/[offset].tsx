import { Query, TPokemon } from '../types'
import Head from 'next/head'
import Header from '../components/Header'
import Pokemons from '../components/pokemons'
import { usePokemons } from '../hooks/usePokemons'
import { ReactElement } from 'react'

function OffsetPage({ limit, offset }: Query) {
  const pokemons: Array<TPokemon> | null = usePokemons({
    limit: Number(limit),
    offset: Number(offset)
  })
  return (
    <>
      <Head>
        <title>POKE MARKET</title>
      </Head>
      <Pokemons limit={limit} offset={offset} pokemons={pokemons} />
    </>
  )
}

export default OffsetPage

OffsetPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
    </>
  )
}

export async function getServerSideProps({ query }: { query: Query }) {
  return {
    props: {
      limit: query.limit,
      offset: query.offset
    }
  }
}

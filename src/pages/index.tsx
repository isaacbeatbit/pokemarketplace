import Pokemons from '../components/pokemons'
import Header from '../components/Header'
import { usePokemons } from '../hooks/usePokemons'
import Head from 'next/head'
import { TPokemon } from '../types'
import { ReactElement } from 'react'

function IndexPage() {
  const pokemons: Array<TPokemon> | null = usePokemons({ limit: 10, offset: 0 })

  return (
    <>
      <Head>
        <title>POKE MARKET</title>
      </Head>
      <Pokemons limit={10} offset={0} pokemons={pokemons} />
    </>
  )
}

export default IndexPage

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
    </>
  )
}

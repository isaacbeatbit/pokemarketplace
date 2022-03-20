import Header from '../components/Header'
import Head from 'next/head'
import { ReactElement } from 'react'
import Pokemons from '../components/Pokemons'

function IndexPage() {
  return (
    <>
      <Head>
        <title>POKE MARKET</title>
      </Head>
      <Pokemons limit={10} offset={0} />
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

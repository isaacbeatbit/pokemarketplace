import { Query } from '../types'
import Head from 'next/head'
import Header from '../components/Header'
import Pokemons from '../components/Pokemons'
import { ReactElement } from 'react'

function OffsetPage({ offset, limit }: Query) {
  return (
    <>
      <Head>
        <title>POKE MARKET</title>
      </Head>
      <Pokemons offset={Number(offset)} limit={Number(limit)} />
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

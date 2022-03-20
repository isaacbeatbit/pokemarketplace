import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { useEffect, useState } from 'react'
import { createClient } from 'graphql-ws'
import WebSocket from 'ws'
import { getMainDefinition } from '@apollo/client/utilities'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const url = 'https://pokeapigraphqldb.herokuapp.com/'

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${url}`,
    // url: 'ws://localhost:4000/',
    webSocketImpl: WebSocket
  })
)

const httpLink = new HttpLink({
  uri: `https://${url}`
  // uri: 'http://localhost:4000'
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const cache = new InMemoryCache()

export function useClient(): any {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>()

  console.log(persistor)

  useEffect(() => {
    const newPersistor = new CachePersistor({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
      debug: true,
      trigger: 'write'
    })

    async function init() {
      await newPersistor.restore()
      setPersistor(newPersistor)
      setClient(
        new ApolloClient({
          link: from([errorLink, splitLink]),
          cache: new InMemoryCache()
        })
      )
    }

    init().catch(console.error)
  }, [])

  return client
}

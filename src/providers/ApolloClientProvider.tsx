import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { PropsWithChildren } from 'react'

const client = new ApolloClient({
  uri: 'https://anilist.co/graphiql',
  cache: new InMemoryCache(),
})

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
};

export default ApolloClientProvider
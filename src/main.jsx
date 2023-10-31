import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {jwtDecode} from 'jwt-decode'
// import Books from './Books.jsx'
// import Authors from './Authors.jsx'


const authLink = setContext(( _, {headers} ) => {
  const token = localStorage.getItem('library-user-token')
  console.log('main token:', token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
    {/* <Books /> */}
  </ApolloProvider>
)

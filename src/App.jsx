import './App.css'
import {
  Routes, Route, Link, BrowserRouter, Navigate
} from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import Authors from './Authors'
import Books from './Books'
import BookForm from './BookForm'
import { useState } from 'react'
import { useEffect } from 'react'
import LoginForm from './LoginForm'

import Recommendation from './Recommendation'


function App() {
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [token, setToken] = useState(null)
  
  const client = useApolloClient()

  useEffect(() => {
    setTimeout(() => {
      setError('')
      setNotice('')
    }, 10000);
  }, [error, notice])


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

    setError('You are logged out')
  }

  console.log('token:', token)
  console.log('storage:', localStorage.getItem('library-user-token'))

  return (
    <>
      <BrowserRouter>
        <div>
          
          <div style={{backgroundColor:'red'}}>
            {error}
          </div>

          <div style={{backgroundColor:'lightgreen'}}>
            {notice}
          </div>

          <Link to="/" style={{padding:5}}>Home</Link>
          <Link to="/authors" style={{padding:5}}>Authors</Link>
          <Link to="/books" style={{padding:5}}>Books</Link>
          
          {localStorage.getItem('library-user-token')
          // {token
            ?  
              <>
                <Link to="/bookForm" style={{padding:5}}>Add book</Link> 
                <Link to="/recommend" style={{padding:5}}>Recommend</Link>
                <button onClick={logout}>Logout</button> 
              </>
            :  
              <Link to="/login" style={{padding:5}}>Login</Link> 
          }


        </div>

        <Routes>
          { !localStorage.getItem('library-user-token') && <Route path="/bookForm" element={<Navigate to="/" />} /> }
          <Route path="/authors" element={<Authors setError={setError} />} />
          <Route path="/books" element={<Books token={token} setNotice={setNotice} setError={setError} />} />
          <Route path="/bookForm" element={<BookForm setError={setError} setNotice={setNotice} />} />
          <Route path='/login/*' element={<LoginForm setToken={setToken} setError={setError} setNotice={setNotice} />} /> 
          <Route path='/recommend' element={<Recommendation token={token} setError={setError} setNotice={setNotice} />} />
          <Route path="/" element={<Books />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App

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

  console.log('Token:', token)
  // console.log('storage', localStorage)

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
          {token ?  <>
                      <Link to="/bookForm" style={{padding:5}}>Add book</Link> 
                      <span >Logged in as {token.username}</span>
                      <button onClick={logout}>Logout</button> 
                    </>
                :  <Link to="/login" style={{padding:5}}>Login</Link> 
          }


        </div>

        <Routes>
          {!token && <Route path="/bookForm" element={<Navigate to="/" />} />}
          <Route path="/authors" element={<Authors setError={setError} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/bookForm" element={<BookForm setError={setError} setNotice={setNotice} />} />
          <Route path='/login/*' element={<LoginForm setToken={setToken} setError={setError} setNotice={setNotice} />} /> 
          <Route path="/" element={<Books />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App

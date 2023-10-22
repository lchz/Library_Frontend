import './App.css'
import {
  Routes, Route, Link, BrowserRouter
} from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import BookForm from './BookForm'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [error, setError] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 10000);
  }, [error])

  return (
    <>
      <BrowserRouter>
        <div>
          <div style={{backgroundColor:'red'}}>
            {error}
          </div>
          <Link to="/" style={{padding:5}}>Home</Link>
          <Link to="/authors" style={{padding:5}}>Authors</Link>
          <Link to="/books" style={{padding:5}}>Books</Link>
          <Link to="/bookForm" style={{padding:5}}>Add book</Link>

        </div>

        <Routes>
          <Route path="/authors" element={<Authors setError={setError} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/bookForm" element={<BookForm setError={setError} />} />
          <Route path="/" element={<Books />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App

import './App.css'
import {
  Routes, Route, Link, BrowserRouter
} from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import BookForm from './BookForm'

function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <Link to="/" style={{padding:5}}>Home</Link>
          <Link to="/authors" style={{padding:5}}>Authors</Link>
          <Link to="/books" style={{padding:5}}>Books</Link>
          <Link to="/bookForm" style={{padding:5}}>Add book</Link>

        </div>

        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/bookForm" element={<BookForm />} />
          <Route path="/" element={<Books />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App

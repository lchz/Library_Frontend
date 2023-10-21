import './App.css'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'

function App() {

  return (
    <>
    <Router>
      <div>
        <Link to="/" style={{padding:5}}>Home</Link>
        <Link to="/authors" style={{padding:5}}>Authors</Link>
        <Link to="/books" style={{padding:5}}>Books</Link>
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/" element={<Books />} />
      </Routes>

    </Router>
    </>
  )
}

export default App

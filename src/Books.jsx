import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "./queries"
import { styles } from "./styleSheet"
import { useEffect, useState } from "react"
import Book from "./Book"


const Books = ({setNotice, setError}) => {

    const [genre, setGenre] = useState('all')
    const [subbooks, setBooks] = useState([])

    const result = useQuery(ALL_BOOKS, {
        onError: (error) => {
            console.log('Books error:', error.message)
            setError(error.message)
        },
    })

    const [getGerens, lazyResult] = useLazyQuery(ALL_BOOKS)
    useEffect(() => {
        getGerens({variables:{genre}}).then(r => setBooks(r.data.allBooks))
    }, [genre])


    if (result.loading) {
        return <div>Loading...</div>
    }

    const genreList = result.data.allBooks.flatMap(b => b.genres)
    const genres = ['all', ...new Set(genreList)]

    const books = result.data.allBooks

    return (
        <div>
            <h1>Books</h1>

            <div>
                in genre <span style={{fontWeight: 'bold'}}>
                            {genre}
                         </span>
            </div>

            <div style={{...styles.gridContainer, gridTemplateColumns:"auto auto auto auto"}}>
                <div style={{}}></div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Author</div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Published</div>
                <div style={{}}></div>

                { genre === 'all' ?
                    books.map(book =>
                        <Book key={book.id} book={book} setError={setError} setNotice={setNotice} />
                    )
                    :
                    subbooks.map(book =>
                        <Book key={book.id} book={book} setError={setError}  setNotice={setNotice} />
                    )
                }
            </div>

            <div>
                {
                    genres.map(g => <input key={g} type="button" value={g} onClick={({target}) => setGenre(target.value)} />)
                }
            </div>
        </div>
    )
}

export default Books
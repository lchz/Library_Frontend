import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "./queries"
import { styles } from "./styleSheet"
import { useState } from "react"


export const Book = ({book}) => {
    // console.log('one book:', book)
    return (
        <>
            <div style={{...styles.gridItem, textAlign:"left"}}>{book.title}</div>
            <div style={styles.gridItem}>{book.author.name}</div>
            <div style={styles.gridItem}>{book.published}</div>
        </>
    )
}


export const Books = () => {
    const [genre, setGenre] = useState('')

    const result = useQuery(ALL_BOOKS, {
        variables: {genre: genre==='all' ? '' : genre},

        onError: (error) => {
            console.log('Books error:', error.message)
        }
    })

    const tempResult = useQuery(ALL_BOOKS)

    if (result.loading || tempResult.loading) {
        return <div>Loading...</div>
    }

    const books = result.data.allBooks

    const allBooks = tempResult.data.allBooks
    const genreList = ["all", ...new Set( allBooks.flatMap(b => b.genres) ) ]

    // console.log('list:', genreList)
    console.log('seleted:', genre)

    return (
        <div>
            <h1>Books</h1>

            <div>
                in genre <span style={{fontWeight: 'bold'}}>
                            {genre ? genre : 'all'}
                         </span>
            </div>

            <div style={styles.gridContainer}>
                <div style={{}}></div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Author</div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Published</div>

                {
                    books.map(book =>
                        <Book key={book.id} book={book} />
                    )
                }
            </div>

            <div>
                {
                    genreList.map(g => <input key={g} type="button" value={g} onClick={({target}) => setGenre(target.value)} />)
                }
            </div>
        </div>
    )
}

// export default Books
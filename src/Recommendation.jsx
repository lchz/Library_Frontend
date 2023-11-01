import { styles } from "./styleSheet"
import { ALL_BOOKS, ME } from "./queries"
import { useQuery, useLazyQuery } from "@apollo/client"
import { useState } from "react"
import { Book } from "./Books"
import { Navigate } from 'react-router-dom'



const Recommendation = ({ token, setError }) => {
    const [books, setBooks] = useState([])
    const [favGenre, setFavGenre] = useState('')

    const [getBooks] = useLazyQuery(ALL_BOOKS)

    const meResult = useQuery(ME, {
        onCompleted: (data) => {
            setFavGenre(data.me.favoriteGenre)
            getBooks( {variables: {genre: data.me.favoriteGenre}} )
                    .then(res => setBooks(res.data.allBooks))
        },
        onError: (error) => {
            setError('Error when showing recommendations:', error.message)

        }
    })

    if ( meResult.loading ) {
        return <div>Loading...</div>
    }
    if (!books) {
        return <div>Loading books...</div>
    }

    return (
        <div>
            { !token &&  <Navigate to="/" /> }

            <h2>Recommendations</h2>
            <div>
                Books in your favorite genre: <span style={{fontWeight: 'bold'}}>
                                                    {favGenre}
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
        </div>
    )
}

export default Recommendation
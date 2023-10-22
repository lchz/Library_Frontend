import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "./queries"
import { styles } from "./styleSheet"


const Book = ({book}) => {
    return (
        <>
            <div style={{...styles.gridItem, textAlign:"left"}}>{book.title}</div>
            <div style={styles.gridItem}>{book.author}</div>
            <div style={styles.gridItem}>{book.published}</div>
        </>
    )
}

const Books = () => {
    const result = useQuery(ALL_BOOKS)
    if (result.loading) {
        return <div>Loading...</div>
    }

    const books = result.data.allBooks
    console.log('books:', books)

    return (
        <div>
            <h1>Books</h1>

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

export default Books
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "./queries"

const styles = {
    gridContainer: {
        display:"grid", 
        gridTemplateColumns:"auto auto auto", 
        backgroundColor:"lightBlue", 
        padding: 10
    },
    gridItem: {
        textAlign:"center", 
        padding: 10,
        // backgroundColor: "red"
    }
}

const Book = ({book}) => {
    return (
        <>
            <div key={book.id} style={{...styles.gridItem, textAlign:"left"}}>{book.title}</div>
            <div key={book.id} style={styles.gridItem}>{book.author}</div>
            <div key={book.id} style={styles.gridItem}>{book.published}</div>
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
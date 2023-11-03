import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, DELETE_BOOK } from "./queries"
import { styles } from "./styleSheet"


const Book = ({book, token, setError, setNotice}) => {

    const [deleteBookQL, result] = useMutation(DELETE_BOOK, {
        refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}],
        onError: (error) => {
            setError(error.message)
        },
    })

    const loggedIn = localStorage.getItem('library-user-token')

    return (
        <>
            <div style={{...styles.gridItem, textAlign:"left"}}>{book.title}</div>
            <div style={styles.gridItem}>{book.author.name}</div>
            <div style={styles.gridItem}>{book.published}</div>
            { loggedIn ? 
                        <div>
                            <button style={{backgroundColor:'red', padding:5, }}
                                    onClick={() => deleteBookQL({variables:{title: book.title},
                                                                    refetchQueries: [ALL_BOOKS, ALL_AUTHORS]}) } >
                                                                        {/* .then(() => {setNotice('Book deleted successfully!')}) */}
                                Delete
                            </button>
                        </div>
                        : <div></div>
            }
        </>
    )
}

export default Book
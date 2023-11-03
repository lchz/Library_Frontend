import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, DELETE_BOOK } from "./queries"
import { styles } from "./styleSheet"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"


const Book = ({book, setError, setNotice}) => {

    const [deleteBookQL, result] = useMutation(DELETE_BOOK, {
        refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}],
        onError: (error) => {
            setError(error.message)
        },
    })

    // useEffect(() => {
    //     if (result.data) {
    //         console.log('Deleted book:', result.data.deleteBook.title)
    //         setNotice('Deleted book successfully')
    //     }
    // }, [result.data])

    const loggedIn = localStorage.getItem('library-user-token')

    return (
        <>
            <div style={{...styles.gridItem, textAlign:"left"}}>{book.title}</div>
            <div style={styles.gridItem}>{book.author.name}</div>
            <div style={styles.gridItem}>{book.published}</div>
            { loggedIn ? 
                        <div>
                            <button style={{backgroundColor:'red', padding:5, }}
                                    onClick={() => deleteBookQL({variables:{title: book.title}}).then(() => setNotice('Deleted!')) } >
                                Delete
                            </button>
                        </div>
                        : <div></div>
            }
        </>
    )
}

export default Book
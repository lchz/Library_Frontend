import { useState } from "react"
import { styles } from "./styleSheet"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "./queries"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"


const BookFormItem = ({itemName, itemValue, setItemValue}) => {
    return (
        <>
            <div style={{...styles.gridItem, textAlign: "right"}}>
                {itemName}: 
            </div>
            <div style={styles.gridItem}>
                <input value={itemValue} onChange={({target}) => setItemValue(target.value)} />
            </div>
            <div></div>
        </>
    )
}

const BookForm = ({setError, setNotice}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genres, setGenres] = useState([])
    const [newGenre, setNewGenre] = useState('')

    const [createBookQL, result] = useMutation(CREATE_BOOK, {
        refetchQueries:  [{query:ALL_AUTHORS}, {query:ALL_BOOKS}],
        onError: (error) => {
            console.log('ERROR:', error.message)
            console.log('graphQLError:', error.graphQLErrors)
            const msg = error.graphQLErrors.map(e => e.message).join('\n')
            msg.concat(`\n${error.message}`)
            setError(msg)
        },
        onCompleted: () => {
            setNotice('A new book added!')
        }
    })

    // console.log('form result:', result)

    const addGenre = (event) => {
        event.preventDefault()
        if (newGenre === '') {
            setError('Genre cannot be empty')
        }
        setGenres(genres.concat(newGenre))
        setNewGenre('')
    }
    const addBook = (event) => {
        event.preventDefault()
        // console.log(title, author, published, genres)
        createBookQL({variables: {title, authorName:author, published:parseInt(published), genres}})
        
        setTitle('')
        setAuthor('')
        setPublished('')
        setGenres([])
    }

    return (
        <div>
            {result.data && <Navigate to="/" />}

            <h1>Add Book</h1>
            <form style={styles.gridContainer} onSubmit={addBook}>
                {/* Three columns */}

                <BookFormItem itemName={"Title"} itemValue={title} setItemValue={setTitle} />
                <BookFormItem itemName={"Author"} itemValue={author} setItemValue={setAuthor} />
                <BookFormItem itemName={"Published year"} itemValue={published} setItemValue={setPublished} />
                
                <div></div>
                <div style={styles.gridItem}>
                    <input value={newGenre} onChange={({target}) => setNewGenre(target.value)} />
                </div>
                <input type="submit" value="add genre" onClick={addGenre} style={styles.gridItem}/>

                <div style={{...styles.gridItem, textAlign: "right"}}>Genres:</div>
                <div style={{...styles.gridItem, textAlign: "left"}}>
                    {genres.map(genre => <span key={genre}>{genre} </span>)}
                </div>
                <div></div>

                <div></div>
                <button style={{backgroundColor: 'orange'}} type="submit">
                    Create book
                </button>
                
            </form>
        </div>
    )
}

export default BookForm
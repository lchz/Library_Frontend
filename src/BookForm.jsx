import { useState } from "react"
import { styles } from "./styleSheet"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "./queries"


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

const BookForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genres, setGenres] = useState([])
    const [newGenre, setNewGenre] = useState('')

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries:  [{query:ALL_AUTHORS}, {query:ALL_BOOKS}],
        onError: (error) => {
            
        }
    })

    const addGenre = (event) => {
        event.preventDefault()
        setGenres(genres.concat(newGenre))
        setNewGenre('')
    }
    const addBook = (event) => {
        event.preventDefault()

        createBook({variables: {title, author, published:parseInt(published), genres}})

        setTitle('')
        setAuthor('')
        setPublished('')
        setGenres([])
    }

    return (
        <form style={styles.gridContainer} onSubmit={addBook}>
            {/* Three columns */}

            <BookFormItem itemName={"Title"} itemValue={title} setItemValue={setTitle} />
            <BookFormItem itemName={"Author"} itemValue={author} setItemValue={setAuthor} />
            <BookFormItem itemName={"Published year"} itemValue={published} setItemValue={setPublished} />
            
            <div></div>
            <div>
                <input value={newGenre} onChange={({target}) => setNewGenre(target.value)} />
            </div>
            <input type="submit" value="add genre" onClick={addGenre} />

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
    )
}

export default BookForm
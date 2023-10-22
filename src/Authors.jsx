import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "./queries"
import { styles } from "./styleSheet"
import { useState } from "react"


const Author = ({author}) => {
    const gridItemStyle = {...styles.gridItem, textAlign:"center"}

    return (
        <>
            <div style={styles.gridItem}>{author.name}</div>
            <div style={gridItemStyle}>{author.born}</div>
            <div style={gridItemStyle}>{author.bookCount}</div>
        </>
    )
}

const BirthyearForm = ({authorNames}) => {
    const [name, setName] = useState(authorNames[0])
    const [year, setYear] = useState('')

    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{query: ALL_AUTHORS}],
        // onError: (error) => {

        // }
    })

    const submitYear = (event) => {
        event.preventDefault()
        // console.log('auth name:', name, 'born:', year)
        updateAuthor({variables: {name, setBornTo: Number(year)}})
        setYear('')
    }

    return (
        <div>
            <h3>Set birthyear</h3>

            <form onSubmit={submitYear} style={{...styles.gridContainer, backgroundColor: 'pink'}}>
                <label style={styles.gridItem}>Name:</label>
                <select style={styles.gridItem} onChange={({target}) => setName(target.value)}>
                    {
                        authorNames.map(name =>
                            <option key={name} value={name} >{name}</option>)
                    }
                </select >
                <div></div>

                <label style={styles.gridItem}>Birthyear:</label>
                <input style={styles.gridItem} value={year} onChange={({target}) => setYear(target.value)} />
                <div></div>

                <div></div>
                <button type="submit" style={{...styles.gridItem, backgroundColor:'lightGreen', textAlign:'center'}}>
                    Update author
                </button>

            </form>



        </div>
    )
}

const Authors = () => {

    const result = useQuery(ALL_AUTHORS)
    if (result.loading) {
        return <div>Loading</div>
    }

    const authors = result.data.allAuthors
    console.log('authors:', authors)

    return (
        <div>
            <h1>Authors</h1>

            <div style={styles.gridContainer}>
                <div></div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Born</div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Books</div>

                {
                    authors.map(author => 
                        <Author key={author.id} author={author} />
                    )
                }
            </div>
            
            <BirthyearForm authorNames={authors.map(a => a.name)} />
        </div>
    )
}

export default Authors
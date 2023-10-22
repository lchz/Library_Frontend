import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "./queries"
import { styles } from "./styleSheet"


const Author = ({author}) => {
    return (
        <>
            <div style={{...styles.gridItem, textAlign:"left"}}>{author.name}</div>
            <div style={styles.gridItem}>{author.born}</div>
            <div style={styles.gridItem}>{author.bookCount}</div>
        </>
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
                <div style={{}}></div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Born</div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Books</div>

                {
                    authors.map(author => 
                        <Author key={author.id} author={author} />
                    )
                }
            </div>
            
        </div>
    )
}

export default Authors
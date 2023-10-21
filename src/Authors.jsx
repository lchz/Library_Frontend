import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "./queries"

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

const Author = ({author}) => {
    return (
        <>
            <div key={author.id} style={{...styles.gridItem, textAlign:"left"}}>{author.name}</div>
            <div key={author.id} style={styles.gridItem}>{author.born}</div>
            <div key={author.id} style={styles.gridItem}>{author.bookCount}</div>
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
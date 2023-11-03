import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "./queries"
import { styles } from "./styleSheet"
import { useEffect, useState } from "react"
import Book from "./Book"


const Books = ({token, setNotice, setError}) => {

    const [genre, setGenre] = useState('all')
    const [showBooks, setShowBooks] = useState([])
    const [info, setInfo] = useState('')

    const allBooksResult = useQuery(ALL_BOOKS, {
        onError: (error) => {
            console.log('Books error:', error.message)
            setError(error.message)
        },
        onCompleted: (data) => {
            console.log('D:', data)
            setShowBooks(data.allBooks)
        }
    })

    // useEffect(() => {
    //     setNotice('Fetching book list!')
    // }, [allBooksResult.result])

    // Set genre
    const [getGenres, lazyResult] = useLazyQuery(ALL_BOOKS)
    useEffect(() => {
        getGenres({variables:{genre}}).then(r => setShowBooks(r.data.allBooks))
    }, [genre])


    // Search Function
    const [searching, searchResult] = useLazyQuery(ALL_BOOKS)

    const search = (event) => {
        event.preventDefault()
        console.log('Searching:', info)

        searching({variables: {title: info},
            onError: (error) => {
                console.log('Error in searching:', error.message)
            },
            onCompleted: (data) => {
                console.log('Completed!')
                console.log('Data:', data)
                setShowBooks(data.allBooks)
            }
        })
    }


    if (allBooksResult.loading) {
        return <div>Loading...</div>
    }

    const genreList = allBooksResult.data.allBooks.flatMap(b => b.genres)
    const genres = ['all', ...new Set(genreList)]

    // const books = result.data.allBooks

    return (
        <div>
            <h1>Books</h1>

            <div>
                in genre <span style={{fontWeight: 'bold'}}>
                            {genre === '' ? 'all' : genre}
                         </span>
            </div>

            <form onSubmit={search}>
                <input value={info} onChange={(e) => setInfo(e.target.value)} />
                <button type="submit" >
                    Search
                </button>
            </form>
            {/* onClick={(event) => search(event)} */}
            <div style={{...styles.gridContainer, gridTemplateColumns:"auto auto auto auto"}}>
                <div style={{}}></div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Author</div>
                <div style={{...styles.gridItem, fontWeight:"bold"}}>Published</div>
                <div style={{}}></div>

                {
                    showBooks.map(book =>
                        <Book key={book.id} book={book} token={token} setError={setError} setNotice={setNotice} />
                    )
                    
                }

                {/* { genre === 'all' ?
                    books.map(book =>
                        <Book key={book.id} book={book} setError={setError} setNotice={setNotice} />
                    )
                    :
                    subbooks.map(book =>
                        <Book key={book.id} book={book} setError={setError}  setNotice={setNotice} />
                    )
                } */}


            </div>

            <div>
                {
                    genres.map(g => <input key={g} type="button" value={g} onClick={({target}) => setGenre(target.value==='all'?'':target.value)} />)
                }
            </div>
        </div>
    )
}

export default Books
import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
    query findAllAuthors {
        allAuthors {
            name
            bookCount
            born
        }
    }
`

export const ALL_BOOKS = gql`
    query findAllBooks {
        allBooks {
            title
            author
            published
        }
    }
`   
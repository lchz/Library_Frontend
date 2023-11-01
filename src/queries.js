import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
    query findAllAuthors {
        allAuthors {
            name
            bookCount
            born
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query findAllBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
            genres
            id
        }
    }
`      

export const ME = gql`
    query getMe {
        me {
            username
            favoriteGenre
        }
    }
`

export const LOGIN = gql`
    mutation Login($loginUsername: String!, $password: String!) {
        login(username: $loginUsername, password: $password) {
            value
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $authorName: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, authorName: $authorName, published: $published, genres: $genres) {
            title
            author {
                name
            }
            published
            genres
          }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`
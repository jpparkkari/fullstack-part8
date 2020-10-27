import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks{
      author
      title
      published
      id
    }
  }
`
export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    )
    {
      title
      author
      published
      genres
      id
    }
  }
`
export const UPDATE_AUTHOR_BIRTH = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    )
    {
      name
      born
      id
    }
  }
`

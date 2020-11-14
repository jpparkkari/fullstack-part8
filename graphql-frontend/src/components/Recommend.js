import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ME, FIND_GENRE } from '../queries'

const Recommend = ({token, ...props}) => {
  const [books, setBooks] = useState({})
  //const allBooks = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  const [getBooks, filteredBooks] = useLazyQuery(FIND_GENRE, {
    fetchPolicy: 'network-only',
    variables: {genre},
    onCompleted: (data) => {
      setBooks(data.allBooks)
    },
    onError: (error) => {
      console.log(error)
    }
  })
  const [getMe, {called, loading, result}] = useLazyQuery(ME, {
    fetchPolicy: "network-only", 
    onCompleted: (data) => {
      setGenre(data.me.favoriteGenre)
      getBooks()
    },
      
  })


  useEffect(() => {
    if (localStorage.getItem('library-user-token')) {
      getMe()
    }
  }, [token, getMe, props.page])


  if (!props.show) {
    return null
  }
  else {

    if (called && loading) {
      return <p>loading ...</p>
    }
  
    if (books.length === 0 ) {
      return <p>no books</p>
    }

  }


  return (
    <div>
      <h2>recommendations</h2>
      <div>in genre <b>{genre}</b></div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend

import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const allBooks = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('it')
  const [getMe, {called, loading, result}] = useLazyQuery(ME, {fetchPolicy: "network-only", onCompleted: (data) => {setGenre(data.me.favoriteGenre)}})

 /* useEffect(() => {
    console.log('useEffect')
    console.log(result)
    //setGenre(result.data.me.favoriteGenre)
    
  }, [result])
 */
  if (!props.show) {
    return null
  }
  else {

  if (called && loading) {
    return <p>loading ...</p>
  }

  if (!called) {
    getMe()
  }
  }

  const books = allBooks.data.allBooks

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
          {books.filter(b=>b.genres.includes(genre)).map(a =>
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

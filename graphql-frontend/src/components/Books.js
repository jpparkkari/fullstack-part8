import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const [all, setAll] = useState(true)
  const {loading, error, data} = useQuery(ALL_BOOKS, {fetchPolicy: 'network-only'})

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks
  const genres = [...new Set(books.map(b => b.genres).flat(1))]

  const genreFilter = (selectedGenre) => {
   
    setGenre(selectedGenre)
    setAll(false)
    
  }

  return (
    <div>
      <h2>books</h2>

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
          {books.filter(b=>b.genres.includes(genre)||all).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map( g => 
          <button key={g} onClick={() => genreFilter(g)} >{g}</button>)}
          <button onClick={() => {setGenre('all'); setAll(true);}} >all</button>
      </div>
    </div>
  )
}

export default Books

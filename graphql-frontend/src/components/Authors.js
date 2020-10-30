import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR_BIRTH } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [updateAuthor] = useMutation(UPDATE_AUTHOR_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error => {
      console.log(error)
    })
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born: parseInt(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({target}) => setName(target.value)}>
            <option ></option>
            {authors.map(a => 
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born <input value={born}
            onChange={({target}) => setBorn(target.value)}
          />
        </div>
        <button disabled={name===''} type='submit'>update author</button>
              
      </form>
    </div>
  )
}

export default Authors
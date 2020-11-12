import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setPage('authors')
  }, [token])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() =>{
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    setPage('books')
    notify('logged out')
    localStorage.clear()
    client.resetStore()
  }


  return (
    <div>
      <Notify errorMessage={errorMessage} />

      <Navbar setPage={setPage} logout={logout} token={token} />
      
      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
        setPage={setPage}
      />

      <Recommend 
        show={page === 'recommend'}
        setError={notify}
        token={token}
        page={page}
      />

      <LoginForm 
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

    </div>
  )

}

export default App;

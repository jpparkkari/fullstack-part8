import React from 'react'

//vai
//const navBar = (props) => {
/*
  if(!props.token) {
    return (
      books
      authors
      login
    )
    return (
      books
      authors
      addBook
      logout
    )
  }
  */
//}
const Button = (props) => {

  return (
    <button onClick = {() => props.setPage(props.page) }>{props.page}</button>
  )
} 

export default Button
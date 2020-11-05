import React from 'react'
import Button from './Button'
//vai
const navBar = ({setPage, logout, token}) => {

  if(!localStorage.getItem('library-user-token')) {
    return (
      <div>
        <Button page='authors' setPage={setPage}></Button> 
        <Button page='books' setPage={setPage}></Button> 
        <Button page='login' setPage={setPage}></Button> 
      </div>
    )
  }
  return (
    <div>
      <Button page='authors' setPage={setPage}></Button> 
      <Button page='books' setPage={setPage}></Button> 
      <Button page='add' setPage={setPage}></Button> 
      <button onClick={() => logout()}>logout</button>
    </div>
  )
}

export default navBar
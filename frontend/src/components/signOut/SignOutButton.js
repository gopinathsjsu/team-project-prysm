import React from 'react'
import {  Button } from 'react-bootstrap'
const SignOutButton = () => {
  const handlSignOut = ()=>{
      localStorage.setItem("isLoggedIn" , false);
      localStorage.setItem("isEmployeeLoggedIn" , false);
      localStorage.setItem("isUserLoggedIn" , false);
      window.location.reload(false);
  }
  return (
    <>
     <Button variant='dark' onClick={handlSignOut}>
         Sign Out
     </Button>
    </>
  )
}

export default SignOutButton
import React from 'react'
import Header from '../components/Header/Header'
import LoginForm from '../components/LoginForm/LoginForm'
import Navbar from '../components/Navbar/Navbar'


function LoginPage() {
  return (
    <>
      <Navbar />
      <div className='main-container'>

        <LoginForm />

      </div>
    </>
  )
}

export default LoginPage
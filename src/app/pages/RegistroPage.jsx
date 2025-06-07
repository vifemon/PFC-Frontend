import React from 'react'
import Header from '../components/Header/Header'
import RegistroForm from '../components/RegistroForm/RegistroForm'
import Navbar from '../components/Navbar/Navbar'

function RegistroPage() {
  return (
    <>
    <Navbar/>
    <div className="main-container">
      <RegistroForm/>
    </div>
    </>
  )
}

export default RegistroPage
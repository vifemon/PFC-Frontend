import React from 'react'
import ToggleReserva from '../components/ToggleReserva/ToggleReserva'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import '../styles/generalPage.css'


function ReservasPage() {
  return (
    <div className='main-container'>
      <Navbar />
      <ToggleReserva/>
    </div>
  )
}

export default ReservasPage
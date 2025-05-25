import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from './app/pages/HomePage'
import LoginPage from './app/pages/LoginPage'
import MiPerfilPage from './app/pages/MiPerfilPage'
import RegistroPage from './app/pages/RegistroPage'
import ReservasPage from './app/pages/ReservasPage'
import AdminPage from './app/pages/AdminPage'
import './index.css'

function App() {

  return (
    <>
     
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/reserva" element={<ReservasPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/registro" element={<RegistroPage/>} />
      <Route path="/miperfil" element={<MiPerfilPage/>} />
      <Route path="/admin" element={<AdminPage/>} />
    </Routes>

    </>
  )
}

export default App

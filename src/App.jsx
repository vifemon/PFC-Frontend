import { Toaster } from 'react-hot-toast';
import './App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from './app/pages/HomePage'
import LoginPage from './app/pages/LoginPage'
import MiPerfilPage from './app/pages/MiPerfilPage'
import RegistroPage from './app/pages/RegistroPage'
import ReservasPage from './app/pages/ReservasPage'
import AdminPage from './app/pages/AdminPage'
import EspaciosPage from './app/pages/EspaciosPage'
import TarifasPage from './app/pages/TarifasPage'
import ContactoPage from './app/pages/ContactoPage'
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
      <Route path="/espacios" element={<EspaciosPage/>} />
      <Route path="/tarifas" element={<TarifasPage/>} />
      <Route path="/contacto" element={<ContactoPage/>} />
    </Routes>
    <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(34, 49, 60, 1)',
            color: '#fff',
            fontSize: '20px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'rgba(110, 195, 255)',
              secondary: 'black',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#ff3333',
              secondary: '#fff',
            },
          },
        }}
      />

    </>
  )
}

export default App

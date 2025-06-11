import { useState } from 'react'
import ToggleReserva from '../components/ToggleReserva/ToggleReserva'
import fondo from "../../assets/muestra.jpg"
import Navbar from '../components/Navbar/Navbar'
import '../styles/generalPage.css'


function ReservasPage() {
  const [tipoReserva, setTipoReserva] = useState("sala");
  return (
    <>
      <Navbar />
      <div className="header-img">
        <img src={fondo} alt="sala"  className={`header-image ${tipoReserva === "sala" ? "active" : "inactive"}`} />
        <img src={fondo} alt="silla"   className={`header-image ${tipoReserva === "silla" ? "active" : "inactive"}`} />
      </div>
      <div className='main-container'>

        <ToggleReserva 
        tipo={tipoReserva} 
        setTipoReserva={setTipoReserva}
        />

      </div>
    </>
  )


}

export default ReservasPage
import { useState } from "react"
import ReservaSalaForm from "../ReservaSalaForm/ReservaSalaForm"

function ToggleReserva() {

    const [tipoReserva, setTipoReserva] = useState("sala")

    const handleToggle = () =>{
        setTipoReserva(prev => (prev === "sala"? "silla" : "sala"))
    }

  return (
    <div >
        <div onClick = {handleToggle}>Cambia a {tipoReserva === "sala" ? "silla": "sala"}</div>
    <p>Reservando {tipoReserva}</p>
    {tipoReserva === "sala" ? <ReservaSalaForm/> : "Reserva silla Form"}
    </div>

  )
}

export default ToggleReserva
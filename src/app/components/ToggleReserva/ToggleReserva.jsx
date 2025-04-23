import { useState } from "react"
import ReservaSalaForm from "../ReservaSalaForm/ReservaSalaForm"
import ReservaSillaForm from "../ReservaSillaForm/ReservaSillaForm"

function ToggleReserva() {

    const [tipoReserva, setTipoReserva] = useState("sala")

    const handleToggle = () =>{
        setTipoReserva(prev => (prev === "sala"? "silla" : "sala"))
    }

  return (
    <div >
        <div onClick = {handleToggle}>Cambia a {tipoReserva === "sala" ? "silla": "sala"}</div>
    <p>Reservando {tipoReserva}</p>
    {tipoReserva === "sala" ? <ReservaSalaForm/> : <ReservaSillaForm/>}
    </div>

  )
}

export default ToggleReserva
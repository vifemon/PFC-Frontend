import { useState } from "react"
import ReservaSalaForm from "../ReservaSalaForm/ReservaSalaForm"
import ReservaSillaForm from "../ReservaSillaForm/ReservaSillaForm"
import "./toggleReserva.css"
import InputField from "../InputField/InputField"

function ToggleReserva() {

  const [tipoReserva, setTipoReserva] = useState("sala")

  const handleToggle = () => {
    setTipoReserva(prev => (prev === "sala" ? "silla" : "sala"))
  }

  return (
    <div className="switch-container">
      <div>Cambia a {tipoReserva === "sala" ? "silla" : "sala"}</div>
      <div>
        <label className="switch">
          <InputField type="checkbox" onClick={handleToggle} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="form-container">
        <p>Reservando {tipoReserva}</p>
        {tipoReserva === "sala" ? <ReservaSalaForm /> : <ReservaSillaForm />}
      </div>
    </div>

  )
}

export default ToggleReserva
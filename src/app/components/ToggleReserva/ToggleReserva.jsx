import { useState } from "react"
import ReservaSalaForm from "../ReservaSalaForm/ReservaSalaForm"
import ReservaSillaForm from "../ReservaSillaForm/ReservaSillaForm"
import "./toggleReserva.css"
import InputField from "../InputField/InputField"

function ToggleReserva({ tipo, setTipoReserva }) {

  

  const handleToggle = () => {
    setTipoReserva(prev => (prev === "sala" ? "silla" : "sala"))
  }

  return (
    <div className="switch-container">
      
      <div>
        <label className="switch">
          <InputField type="checkbox" onClick={handleToggle} checked={tipo === "silla"} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="form-container">
        <h2>Reservando {tipo}</h2>
        {tipo === "sala" ? <ReservaSalaForm /> : <ReservaSillaForm />}
      </div>
    </div>

  )
}

export default ToggleReserva
import { useState } from "react"
import Button from "../Button/Button"
import InputField from "../InputField/InputField"

function ReservaSalaForm() {
    const [form, setForm] = useState({
        sala: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",

    })
    const [error, setError]= useState({});

    const validarReserva = () => {
        const erroresTemp = {}

        if (!form.sala) erroresTemp.sala = "Debes seleccionar una sala";
        if (!form.fecha) erroresTemp.fecha = "Debes introducir una fecha";
        if (!form.horaInicio) erroresTemp.horaInicio = "Debes seleccionar una hora de inicio";
        if (!form.horaFin) erroresTemp.horaFin = "Debes seleccionar una hora de fin";

        const today = new Date();
        today.setHours(0,0,0,0);
        const fechaCheck = new Date(form.fecha);
        fechaCheck.setHours(0,0,0,0)

        if (fechaCheck < today) erroresTemp.fecha = "La fecha debe ser como mínimo la del día de hoy"

        if (form.horaInicio && form.horaFin) {
            const [hInicio, mInicio] = form.horaInicio.split(":").map(Number);
            const [hFin, mFin] = form.horaFin.split(":").map(Number);
      
            const horaInicioFecha = new Date();
            horaInicioFecha.setHours(hInicio, mInicio, 0, 0);
            const horaFinFecha = new Date();
            horaFinFecha.setHours(hFin, mFin, 0, 0);
      
            if (horaFinFecha <= horaInicioFecha) {
              erroresTemp.horaFin = "La hora de fin debe ser posterior a la de inicio";
            }
          }

        setError(erroresTemp)
        return Object.keys(erroresTemp).length === 0;
    }

    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    } 

    // Fer servei e implementar handleReserva async
    const handleReserva = () =>{
        if (validarReserva()){
        console.log(form)
        }
    }


    return (
        <div>
            <label htmlFor="sala">Sala:</label>
            <select id="sala" onChange={handleChange}>
                <option value="">Selecciona sala</option>
                <option value="sala1">Sala 1</option>
                <option value="sala2">Sala 2</option>
            </select>
            {error.sala && <span className="error">{error.sala}</span>}

            <InputField 
             type="date"
             label="Fecha:"
             id="fecha"
             value={form.fecha}
             onChange={handleChange}
             error={error.fecha}/>

            <label htmlFor="horaInicio">Hora Inicio:</label>
            <select id="horaInicio" onChange={handleChange}>
                <option value="">Selecciona hora inicio</option>
                <option value="8:00">8:00</option>
            </select>
            {error.horaInicio && <span className="error">{error.horaInicio}</span>}
            
            <InputField
            type="time"
            label="Hora Inicio:"
            id="horaInicio"
            step="3600"
            onChange={handleChange}
            error={error.horaInicio}
            />
            <label htmlFor="horaFin">Hora Fin:</label>
            <select id="horaFin" onChange={handleChange}>
                <option value="">Selecciona hora final</option>
                <option value="9:00">9:00</option>
            </select>
            {error.horaFin && <span className="error">{error.horaFin}</span>}
            
            <Button
                text="Reservar"
                onClick={handleReserva}
            />

        </div>
    )
}

export default ReservaSalaForm
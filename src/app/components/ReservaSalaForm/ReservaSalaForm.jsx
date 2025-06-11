import { toast } from 'react-hot-toast';
import { useState } from "react"
import Button from "../Button/Button"
import InputField from "../InputField/InputField"
import { reservaSalas } from "../../service/bookingService";
import { useNavigate } from "react-router-dom";
import '../../styles/perfilPage.css'

function ReservaSalaForm() {
    const [form, setForm] = useState({
        sala: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",

    })
    const [error, setError] = useState({});
    const [salaOcupada, setSalaOcupada] = useState(false)
    const [reservaRealizada, setReservaRealizada] = useState(false)
    const navigate = useNavigate();
    const horas = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00"
    ];

    const validarReserva = () => {
        const erroresTemp = {}

        if (!form.sala) erroresTemp.sala = "Debes seleccionar una sala";
        if (!form.fecha) erroresTemp.fecha = "Debes introducir una fecha";
        if (!form.horaInicio) erroresTemp.horaInicio = "Debes seleccionar una hora de inicio";
        if (!form.horaFin) erroresTemp.horaFin = "Debes seleccionar una hora de fin";

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const fechaCheck = new Date(form.fecha);
        fechaCheck.setHours(0, 0, 0, 0)

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
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
        setError((prev) => ({ ...prev, [id]: undefined }));
    }


    const handleReserva = async () => {
        setSalaOcupada(false);
        setReservaRealizada(false);

        if (validarReserva()) {
            try {

                const idUsuario = sessionStorage.getItem('usuario_id')
                if (idUsuario === null) {
                    toast.error('Primero debes iniciar sesión');
                    navigate("/login")

                }

                const formReserva = new URLSearchParams;
                formReserva.append('usuario_id', idUsuario)
                formReserva.append('fecha', form.fecha)
                formReserva.append('hora_inicio', form.horaInicio)
                formReserva.append('hora_fin', form.horaFin)
                formReserva.append('sala_id', form.sala)

                const res = await reservaSalas(formReserva)
                if (res.status === "error") {
                    setSalaOcupada(true)
                } else {
                    setSalaOcupada(false)
                    setReservaRealizada(true)
                }

            } catch {
                console.log("Error a la hora de ejecutar reserva")
            }
        }
    }


    return (
        <div className="form-container__inputs">
            <label htmlFor="sala">Sala:</label>
            <select id="sala" onChange={handleChange} value={form.sala}>
                <option value="">Selecciona sala</option>
                <option value="1">Sala Sol</option>
                <option value="2">Sala Sombra</option>
            </select>
            {error.sala && <span className="mensaje-error">{error.sala}</span>}

            <InputField
                type="date"
                label="Fecha:"
                id="fecha"
                value={form.fecha}
                onChange={handleChange}
                error={error.fecha} />

            <label htmlFor="horaInicio">Hora Inicio:</label>
            <select id="horaInicio" onChange={handleChange}>
                <option value="">Selecciona hora inicio</option>
                {horas.map(hora => (
                    <option key={hora} value={hora}>
                        {hora}
                    </option>
                ))}
            </select>
            {error.horaInicio && <span className="mensaje-error">{error.horaInicio}</span>}


            <label htmlFor="horaFin">Hora Fin:</label>
            <select id="horaFin" onChange={handleChange}>
                <option value="">Selecciona hora final</option>
                {horas.map(hora => (
                    <option key={hora} value={hora}>
                        {hora}
                    </option>
                ))}
                <option value="22:00">22:00</option>
            </select>
            {error.horaFin && <span className="mensaje-error">{error.horaFin}</span>}

            <Button
                text="Reservar"
                onClick={handleReserva}
            />

            {salaOcupada === true && (
                <div>
                    <h2>Sala ocupada en ese horario</h2>
                </div>
            )}

            {reservaRealizada === true && (
                <div>
                    <h2>Reserva realizada con éxito</h2>
                </div>
            )}

        </div>
    )
}

export default ReservaSalaForm
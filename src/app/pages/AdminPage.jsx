import Header from "../components/Header/Header"
import Button from "../components/Button/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { miPerfilMostrar } from '../service/usersService';
import { reservaEliminar } from "../service/bookingService";
import Navbar from "../components/Navbar/Navbar";
import '../styles/perfilPage.css'

function HomePage() {
  const usuarioId = sessionStorage.getItem('usuario_id');
  const navigate = useNavigate();
  const [todasReservas, setTodasReservas] = useState([])
  const [reservaEliminadaId, setReservaEliminadaId] = useState(null);


  useEffect(() => {
    const getReservas = async () => {
      const formId = new URLSearchParams;
      formId.append('usuario_id', usuarioId)
      try {
        const getDatos = await miPerfilMostrar(formId)
        setTodasReservas(getDatos.reservas)
      } catch (error) {
        console.log("Error al obtener los datos", error)
      }
    }
    getReservas();
  }, [usuarioId])

  const handleLogout = () => {
    sessionStorage.removeItem('usuario')
    sessionStorage.removeItem('usuario_id')
    navigate("/")

  }

  const handleDelete = async (id) => {
    try {

      const reservaAEliminar = new URLSearchParams();
      reservaAEliminar.append('id', id);

      const res = await reservaEliminar(reservaAEliminar);
      if (res.status === "success") {
        setReservaEliminadaId(id);
        setTodasReservas(todasReservas.filter(reserva => reserva.id !== id));
        setTimeout(() => setReservaEliminadaId(null), 3000);
      }

    }
    catch (error) {
      console.log("Error al tratar de eliminar la reserva", error);
    }


  }
  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="title-container">


          <div className="datos-container">
            <h1>Admin page</h1>
            <Button
              text="Cerrar modo administrador"
              onClick={() => { handleLogout() }}
            />
          </div>
        </div>
        <div className="title-container">
          <h1>Todas las reservas</h1>
        
        <div className="reservas-container">
          <table className="reservas-container__row">
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Reserva</th>
            <th>Hora inicio</th>
            <th>Hora fin</th>
            <th>Elminar reserva</th>
            {todasReservas.map((reserva) => (
              <tr key={reserva.id} className="reservas-container__row">
                <td>{reserva.fecha_format}</td>
                <td>{reserva.nombre_completo}</td>
                {reserva.sala_id && (
                  reserva.sala_id == 1 ? <td>Sala Azul</td> : <td>Sala Roja</td>
                )}
                {reserva.cantidad_sillas && (
                  <td>Sillas: {reserva.cantidad_sillas}</td>
                )}
                <td>{reserva.hora_inicio_format}</td>
                <td>{reserva.hora_fin_format}</td>
                <td className="button-container__delete">
                  <Button
                    text="Eliminar"
                    onClick={() => handleDelete(reserva.id)} />
                </td>
               
              </tr>
            ))}
          </table>
          <div className="reservas-cards">
            {todasReservas.map((reserva) => (
              <div key={reserva.id} className="reserva-card">
                <p><strong>Fecha:</strong> {reserva.fecha_format}</p>
                <p><strong>{reserva.nombre_completo}</strong></p>
                <p><strong>Reserva:</strong> {reserva.sala_id === 1 ? "Sala Azul" : "Sala Roja"}</p>
                {reserva.cantidad_sillas && <p><strong>Sillas:</strong> {reserva.cantidad_sillas}</p>}
                <p><strong>Inicio:</strong> {reserva.hora_inicio_format}</p>
                <p><strong>Fin:</strong> {reserva.hora_fin_format}</p>
                <Button
                  text="Eliminar"
                  className="button-eliminar"
                  onClick={() => handleDelete(reserva.id)}
                />
               
              </div>
            ))}
          </div>
          {reservaEliminadaId && (
                  <h4>Reserva eliminada correctamente</h4>
                )}
        </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
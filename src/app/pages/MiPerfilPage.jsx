import Header from '../components/Header/Header'
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { miPerfilMostrar, reservaEliminar } from '../service/usersService';

function MiPerfilPage() {
  const usuarioId = sessionStorage.getItem('usuario_id');
  const navigate = useNavigate();
  const [usuarioLogeado, setusuarioLogeado] = useState({
    usuario: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    reservas: []
  })
  const [reservaEliminadaId, setReservaEliminadaId] = useState(null); 

  useEffect(  () => {
    const getDatosUsuario = async () => {
    const formId = new URLSearchParams;
    formId.append('usuario_id', usuarioId)
    try {
    const getDatos = await miPerfilMostrar(formId)
    setusuarioLogeado({
      ...getDatos.usuario,
      reservas: getDatos.reservas
    }) 
    } catch (error) {
      console.log("Error al obtener los datos", error)
    }  
  }
    getDatosUsuario();
  },[])



  const handleLogout = () => {
    sessionStorage.removeItem('usuario')
    sessionStorage.removeItem('usuario_id')
    navigate("/")

  }

const handleDelete = async (id) => {
    try{

      const reservaAEliminar = new URLSearchParams();
      reservaAEliminar.append('id', id);
      
      const res = await reservaEliminar(reservaAEliminar);
      if (res.status === "success") {
        setReservaEliminadaId(id);
        setusuarioLogeado(prev => ({
          ...prev,
          reservas: prev.reservas.filter(reserva => reserva.id !== id)
        }));
        setTimeout(() => setReservaEliminadaId(null), 3000);
      }

    }
    catch (error) {
      console.log("Error al tratar de eliminar la reserva", error);
    }
  }

  return (
    <div>
      <Header />
      <div>
        <h3>{usuarioLogeado.usuario}</h3>
        <h4>{usuarioLogeado.nombre}</h4>
        <h4>{usuarioLogeado.apellidos}</h4>
        <p>{usuarioLogeado.telefono}</p>
        <p>{usuarioLogeado.email}</p>
      <Button
        text="Log out"
        onClick={() => { handleLogout() }}
      />
      </div>
      {usuarioLogeado.reservas.map((reserva)=>(
        <div key={reserva.id}>
          <h4>{reserva.fecha_format}</h4>
          {reserva.sala_id && (
            reserva.sala_id == 1 ? <h4>Sala Azul</h4> : <h4>Sala Roja</h4>
          )}
          {reserva.cantidad_sillas && (
            <h4>Sillas: {reserva.cantidad_sillas}</h4>
          )}
          <p>{reserva.hora_inicio_format}</p>
          <p>{reserva.hora_fin_format}</p>
          <Button 
          text="Eliminar"
          onClick={() =>handleDelete(reserva.id)}/>
        </div>
      ))}
{reservaEliminadaId && (
            <h4>Reserva eliminada correctamente</h4>
          )}
      
    </div>
  )
}

export default MiPerfilPage
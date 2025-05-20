import Header from '../components/Header/Header'
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { editarDatos, miPerfilMostrar } from '../service/usersService';
import { reservaEliminar } from '../service/bookingService';
import InputField from '../components/InputField/InputField';

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
  const [isEdit, setIsEdit] = useState(false)
  const [error, setError] = useState({});

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

  const handleChange = (e) => {
    setusuarioLogeado(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleEdit = () => {
    console.log("Editar datos")
    setIsEdit(true)
  }

  const validarInsert = async () => {
    const erroresTemp = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const telefonoRegex = /^(\+34|0034|34)?[6789]\d{8}$/;

    if (usuarioLogeado.usuario.length <= 1)
      erroresTemp.usuario = "Debes introducir usuario";
    if (usuarioLogeado.nombre.length <= 1) erroresTemp.nombre = "Debes introducir nombre";
    if (usuarioLogeado.apellidos.length <= 1)
      erroresTemp.apellidos = "Debes introducir apellidos";
    if (!emailRegex.test(usuarioLogeado.email))
      erroresTemp.email = "Debe ser un email válido";
    if (!telefonoRegex.test(usuarioLogeado.telefono))
      erroresTemp.telefono = "Debe ser un teléfono válido";

    setError(erroresTemp);
    if (Object.keys(erroresTemp).length === 0) {
      
      try{

        const datosUpdate = new URLSearchParams();
        datosUpdate.append('id', usuarioId);
        datosUpdate.append('usuario', usuarioLogeado.usuario);
        datosUpdate.append('nombre', usuarioLogeado.nombre);
        datosUpdate.append('apellidos', usuarioLogeado.apellidos);
        datosUpdate.append('telefono', usuarioLogeado.telefono);
        datosUpdate.append('email', usuarioLogeado.email);
        
        const res = await editarDatos(datosUpdate);
        if (res.status === "success") {
          alert("Datos actualizados correctamente")
        }
  
      }
      catch (error) {
        console.log("Error al tratar de actualizar los datos", error);
      }


      setIsEdit(false)
    }
  }

  return (
    <div>
      <Header />
      <div>
        <InputField
        type="text"
        label="Usuario:"
        id="usuario"
        value={usuarioLogeado.usuario}
        onChange={handleChange}
        error={error.usuario}
        disabled = {!isEdit}
        />
        <InputField
        type="text"
        label="Nombre:"
        id="nombre"
        value={usuarioLogeado.nombre}
        onChange={handleChange}
        error={error.nombre}
        disabled = {!isEdit}
        />
        <InputField
        type="text"
        label="Apellidos:"
        id="apellidos"
        value={usuarioLogeado.apellidos}
        onChange={handleChange}
        error={error.apellidos}
        disabled = {!isEdit}
        />
        <InputField
        type="text"
        label="Telefono:"
        id="telefono"
        value={usuarioLogeado.telefono}
        onChange={handleChange}
        error={error.telefono}
        disabled = {!isEdit}
        />
         <InputField
        type="text"
        label="Email:"
        id="email"
        value={usuarioLogeado.email}
        onChange={handleChange}
        error={error.email}
        disabled = {!isEdit}
        />
        <Button
        text="Modificar datos"
        onClick={handleEdit}
        />
        {isEdit && (
          <Button 
          text="Guardar cambios"
          onClick={validarInsert}/>
        )}
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
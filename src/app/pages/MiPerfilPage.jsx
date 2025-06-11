import { toast } from 'react-hot-toast';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { editarDatos, miPerfilMostrar } from '../service/usersService';
import { reservaEliminar } from '../service/bookingService';
import InputField from '../components/InputField/InputField';
import Navbar from '../components/Navbar/Navbar';
import '../styles/perfilPage.css'

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

  useEffect(() => {
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
  }, [])



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

      try {

        const datosUpdate = new URLSearchParams();
        datosUpdate.append('id', usuarioId);
        datosUpdate.append('usuario', usuarioLogeado.usuario);
        datosUpdate.append('nombre', usuarioLogeado.nombre);
        datosUpdate.append('apellidos', usuarioLogeado.apellidos);
        datosUpdate.append('telefono', usuarioLogeado.telefono);
        datosUpdate.append('email', usuarioLogeado.email);

        const res = await editarDatos(datosUpdate);
        if (res.status === "success") {
          toast.success('Datos actualizados correctamente');
        }

      }
      catch (error) {
        console.log("Error al tratar de actualizar los datos", error);
      }


      setIsEdit(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="datos-container">
          <div className="foto-perfil"></div>
          <div className="nombre-container__title"><h2>{usuarioLogeado.nombre}</h2>
            <h2>{usuarioLogeado.apellidos}</h2>
            <h4>Usuario: {usuarioLogeado.usuario}</h4></div>
          <Button
            text="Log out"
            onClick={() => { handleLogout() }}
            variant="important"
          />
        </div>
        <div className="title-container">
          <h1>Información personal</h1>

          <div className="datos-container datos-container__edit">

            <div className="form-container__inputs">
              <InputField
                type="text"
                label="Nombre:"
                id="nombre"
                value={usuarioLogeado.nombre}
                onChange={handleChange}
                error={error.nombre}
                disabled={!isEdit}
              />
              <InputField
                type="text"
                label="Apellidos:"
                id="apellidos"
                value={usuarioLogeado.apellidos}
                onChange={handleChange}
                error={error.apellidos}
                disabled={!isEdit}
              />
            </div>
            <div className="form-container__inputs">
              <InputField
                type="text"
                label="Telefono:"
                id="telefono"
                value={usuarioLogeado.telefono}
                onChange={handleChange}
                error={error.telefono}
                disabled={!isEdit}
              />
              <InputField
                type="text"
                label="Email:"
                id="email"
                value={usuarioLogeado.email}
                onChange={handleChange}
                error={error.email}
                disabled={!isEdit}
              />
            </div>
            <div className="buttons-container">
              <Button
                text="Modificar datos"
                onClick={handleEdit}
              />
              {isEdit && (
                <Button
                  text="Guardar cambios"
                  onClick={validarInsert} />
              )}

            </div>
          </div>
        </div>
        <div className="title-container">
          <h1>Mis reservas</h1>
        <div className="reservas-container">
          <table className="reservas-container__row">
            <th>Fecha</th>
            <th>Reserva</th>
            <th>Hora inicio</th>
            <th>Hora fin:</th>
            <th>Elminar reserva</th>

            {usuarioLogeado.reservas.map((reserva) => (
              <tr key={reserva.id} className="reservas-container__row">
                <td>{reserva.fecha_format}</td>
                {reserva.sala_id && (
                  reserva.sala_id == 1 ? <td>Sala Sol</td> : <td>Sala Sombra</td>
                )}
                {reserva.cantidad_sillas && (
                  <td>Sillas: {reserva.cantidad_sillas}</td>
                )}
                <td>{reserva.hora_inicio_format}</td>
                <td>{reserva.hora_fin_format}</td>
                <td className="button-container__delete">
                  <Button
                  text="Eliminar"
                  className="button-eliminar"
                  onClick={() => handleDelete(reserva.id)} />
                </td>
                
              </tr>
            ))}
          </table>
          
<div className="reservas-cards">
  {usuarioLogeado.reservas.map((reserva) => (
    <div key={reserva.id} className="reserva-card">
      <p><strong>Fecha:</strong> {reserva.fecha_format}</p>
      <p><strong>Reserva:</strong> {reserva.sala_id === 1 ? "Sala Sol" : "Sala Sombra"}</p>
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

export default MiPerfilPage
import { useState } from "react";
import InputField from "../InputField/InputField";
import {handleRegistro} from "../../service/handleRegistro";
import Button from "../Button/Button";

function RegistroForm() {
  const [form, setForm] = useState({
    usuario: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState({});
  const [registroExito, setRegistroExito] = useState(false);

  const validarRegistro = () => {
    const erroresTemp = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const telefonoRegex = /^(\+34|0034|34)?[6789]\d{8}$/;

    if (form.usuario.length <= 1)
      erroresTemp.usuario = "Debes introducir usuario";
    if (form.nombre.length <= 1) erroresTemp.nombre = "Debes introducir nombre";
    if (form.apellidos.length <= 1)
      erroresTemp.apellidos = "Debes introducir apellidos";
    if (!emailRegex.test(form.email))
      erroresTemp.email = "Debe ser un email válido";
    if (!telefonoRegex.test(form.telefono))
      erroresTemp.telefono = "Debe ser un teléfono válido";
    if (form.password1.length <= 5 || form.password2.length <= 5) {
      erroresTemp.password = "La contraseña debe ser mayor de 5 digitos";
    } else if (form.password1 !== form.password2) {
      erroresTemp.password = "Las contraseñas deben coincidir";
    }

    setError(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (validarRegistro()) {
      console.log(form);
      try {
        const formData = new URLSearchParams();
        formData.append("usuario", form.usuario);
        formData.append("nombre", form.nombre);
        formData.append("apellidos", form.apellidos);
        formData.append("email", form.email);
        formData.append("telefono", form.telefono);
        formData.append("password", form.password1);

        const res = await handleRegistro(formData);

        if (res.status === "success") {
          setRegistroExito(true);
        }
      } catch {
        console.error("Error al registrar usuario");
      }
    }
  };

  return (
    <div>
      <InputField
        type="text"
        label="Nombre de usuario"
        id="usuario"
        value={form.usuario}
        onChange={handleChange}
        error={error.usuario}
      />
      <InputField
        type="text"
        label="Nombre:"
        id="nombre"
        value={form.nombre}
        onChange={handleChange}
        error={error.nombre}
      />
      <InputField
        type="text"
        label="Apellidos:"
        id="apellidos"
        value={form.apellidos}
        onChange={handleChange}
        error={error.apellidos}
      />
      <InputField
        type="text"
        label="Email:"
        id="email"
        value={form.email}
        onChange={handleChange}
        error={error.email}
      />
      <InputField
        type="text"
        label="Teléfono:"
        id="telefono"
        value={form.telefono}
        onChange={handleChange}
        error={error.telefono}
      />
      <InputField
        type="password"
        label="Contraseña:"
        id="password1"
        value={form.password1}
        onChange={handleChange}
        error={error.password}
      />
      <InputField
        type="password"
        label="Repite contraseña:"
        id="password2"
        value={form.password2}
        onChange={handleChange}
        error={error.password}
      />
      <Button
            text="Registrar"
            onClick={handleSubmit}
          />
      {registroExito && (
        <div className="reg-success">
          <span>Registro Correcto</span>
          <br />
          <Button
            text="Ves a login"
            onClick={() => (window.location.href = "login.html")}
          />
        </div>
      )}
    </div>
  );
}

export default RegistroForm;

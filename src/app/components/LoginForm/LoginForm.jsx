import { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

function LoginForm() {
    const [form, setForm] = useState({
        usuario: "",
        password: "",
    })

    const [error, setError] = useState({});
    const [loginExito, setLoginExito] = useState(false)

    const validarLogin = () => {
        const erroresTemp = {};

        if (!form.usuario.length > 0) erroresTemp.usuario = "Debes introducir usuario";
        if (!form.password.length > 0) erroresTemp.password = "Debes introducir una contraseña";

        setError(erroresTem);
        return Object.keys(erroresTemp).length === 0;

    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    //Falta handlesubmit i guardar el usuari en localStorage
    return (
        <div>
            <InputField
                type="text"
                label="Login:"
                id="usuario"
                value={form.usuario}
                onChange={handleChange}
                error={error.usuario}
            />
            <InputField
                type="password"
                label="Password:"
                id="password"
                value={form.password}
                onChange={handleChange}
                error={error.password}
            />
            <Button
            text="Login"
            onClick={validarLogin}
            />
        </div>

    );

}
export default LoginForm;
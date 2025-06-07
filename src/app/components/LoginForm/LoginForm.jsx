import { useState, useEffect } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { loginValidate } from "../../service/usersService";
import { useNavigate } from "react-router-dom";
import '../../styles/generalPage.css'

function LoginForm() {
    const [form, setForm] = useState({
        usuario: "",
        password: "",
    })

    const [error, setError] = useState({});
    const [loginExito, setLoginExito] = useState(true)
    const [isLogged, setIsLogged] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = sessionStorage.getItem('usuario');
        if (usuario) {
            setIsLogged(true);
        }
    }, []);

    const validarLogin = () => {
        const erroresTemp = {};

        if (!form.usuario) erroresTemp.usuario = "Debes introducir usuario";
        if (!form.password) erroresTemp.password = "Debes introducir una contraseña";

        setError(erroresTemp);
        return Object.keys(erroresTemp).length === 0;

    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async () => {
        if (validarLogin()) {
            try {
                const formData = new URLSearchParams();
                formData.append('usuario', form.usuario);
                formData.append('password', form.password)

                const res = await loginValidate(formData)

                if (res.status === "success") {
                    setIsLogged(true)
                    setLoginExito(true)
                    sessionStorage.setItem('usuario', form.usuario);
                    sessionStorage.setItem('usuario_id', res.user_id)
                    
                    if (res.user_id === 1){
                        setTimeout(() => {
                            navigate("/admin")
                        }, 1000)
                    } else {
                        setTimeout(() => {
                            navigate("/miperfil")
                        }, 1000)
                    }


                } else {
                    setLoginExito(false);
                }
            }
            catch {
                console.log("Error a la hora de intentar el login")
            }
        }

    }

    const handleLogout = () => {
        setIsLogged(false)
        sessionStorage.removeItem('usuario')
        sessionStorage.removeItem('usuario_id')
    }

    const goToRegistro = () => {
        return navigate("/registro")
    }

    return (
        <div className="form-container">
            <h2>Login</h2>
            {!isLogged && (
                <div className="form-container__inputs">
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
                        onClick={handleSubmit}
                    />
                    <Button
                    text="Crear cuenta"
                    onClick={goToRegistro} />
                      
                </div>
            )}

            {!loginExito && (
                <div className="login-form__error"><h2>Login incorrecto</h2></div>)}
        </div>

    );

}
export default LoginForm;
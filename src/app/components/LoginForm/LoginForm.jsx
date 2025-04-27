import { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { loginValidate } from "../../service/usersService";

function LoginForm() {
    const [form, setForm] = useState({
        usuario: "",
        password: "",
    })

    const [error, setError] = useState({});
    const [loginExito, setLoginExito] = useState(false)

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

    const handleSubmit = async() =>{
        if(validarLogin()){
            try{
                const formData = new URLSearchParams();
                formData.append('usuario', form.usuario);
                formData.append('password', form.password)

                const res = await loginValidate(formData)

                if(res.status === "success"){
                    setLoginExito(true);
                    sessionStorage.setItem('usuario', form.usuario);
                    sessionStorage.setItem('usuario_id', res.user_id)
                    const user = sessionStorage.getItem('user')
                    const usuario_id = sessionStorage.getItem('usuario_id')
                    console.log(res)
                    console.log("user", user)
                    console.log('id', usuario_id)
                }
            }
            catch{
                console.log("Error a la hora de intentar el login")
            }
        }

    }

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
            onClick={handleSubmit}
            />
        </div>

    );

}
export default LoginForm;
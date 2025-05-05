import { Link, useNavigate } from "react-router-dom"


function Header() {
    const isLogged = sessionStorage.getItem('usuario');

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/reserva">Reserva</Link>
                    </li>
                    <li>
                        {isLogged ? (
                            <Link to="/miperfil">Mi perfil</Link>
                        ) : (
                            <Link to="/login">Mi perfil</Link>)}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
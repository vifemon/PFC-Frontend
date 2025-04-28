import { Link } from "react-router-dom"

function Header() {
  return (
    <div><nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/reserva">Reserva</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
        </nav></div>
  )
}

export default Header
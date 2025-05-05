import Header from "../components/Header/Header"
import Button from "../components/Button/Button"
import { useNavigate } from "react-router-dom"

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('usuario')
    sessionStorage.removeItem('usuario_id')
    navigate("/")

  }
  return (
    <div>
        <Header />
        <h1>Admin page</h1>
        <Button
        text="Log out"
        onClick={() => { handleLogout() }}
      />
    </div>
  )
}

export default HomePage
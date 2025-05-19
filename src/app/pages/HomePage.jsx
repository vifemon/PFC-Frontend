import Header from "../components/Header/Header"
import Navbar from "../components/Header/Menu"

function HomePage() {
  return (
    <div>
      {/* <Navbar/> */}
        <Header />
        <div style={{backgroundColor:"red", height: "500vh"}} ></div>
    </div>
  )
}

export default HomePage
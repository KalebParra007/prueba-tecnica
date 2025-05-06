import { Link } from "react-router-dom"
import "./Header.css"
import Logo from "../../public/LogoStore.png"
function Header(){
    return(
    <header className="header">
        <img src={Logo} alt="" />
        <h1>Alimentos Artesanales</h1>
        <Link className="link" to={"/Login"}>Inicia Sesion</Link>
    </header>)
}

export default Header
import Login from "./Login.jsx"
import { Link } from "react-router-dom"
import "./Header.css"

function Header(){
    return(<header>
        <Link to="/Login">Iniciar Sesion</Link>
        <h1>Alimentos Artesanales</h1>
        <Link>Ver Productos</Link>
    </header>)
}

export default Header
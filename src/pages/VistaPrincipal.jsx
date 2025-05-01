import Header from "../components/Header"
import Card from "../components/Card"
import "./VistaPrincipal.css"

function VistaPrincipal(){
    return(<>
        <Header/>
        <div className="container">
        <Card ImagenOrigen={"../public/Conservas.jpg"} Alt={"Conservas"} />
        <Card ImagenOrigen={"../public/Mermelada.jpg"} Alt={"Mermelada"} />
        <Card ImagenOrigen={"../public/Salsa.jpg"} Alt={"Salsa"} />
        </div>
        </>)
}

export default VistaPrincipal
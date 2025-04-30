import Header from "../components/Header"
import Card from "../components/Card"

function VistaPrincipal(){
    return(<>
        <Header/>
        <Card ImagenOrigen={"../img/Conservas.jpg"} Alt={"Conservas"}/>
        <Card ImagenOrigen={"../img/Mermelada.jpg"} Alt={"Mermelada"}/>
        <Card ImagenOrigen={"../img/Salsa.jpg"} Alt={"Salsa"}/>
        </>)
}

export default VistaPrincipal
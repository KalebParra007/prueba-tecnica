import Header from "../components/Header"
import Card from "../components/Card"
import "./VistaPrincipal.css"

function VistaPrincipal(){
    return(<>
    <header>
    <Header/>
    </header>
    <main>
    <div className="container">
            <div className="div-img">
            <Card ImagenOrigen={"../public/Conservas.jpg"} Alt={"Conservas"} />
            </div>
            <div className="div-img">
            <Card ImagenOrigen={"../public/Mermelada.jpg"} Alt={"Mermelada"} />
            </div>
            <div className="div-img">
            <Card ImagenOrigen={"../public/Salsa.jpg"} Alt={"Salsa"} />
            </div>
            </div>
        </main> 
        </>)
}

export default VistaPrincipal
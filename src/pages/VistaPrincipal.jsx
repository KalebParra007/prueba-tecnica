import Header from "../components/Header"
import Card from "../components/Card"
import "./VistaPrincipal.css"
import { useNavigate } from "react-router-dom"

function VistaPrincipal(){
    let navigate = useNavigate()
    const handleNavigateToLogin = () => {
        navigate('/login');
    }
    return(
        <>
            <Header/>
            <section className="hero">
                <div className="hero-content">
                    <h1>Sabores Artesanales</h1>
                    <p>Tradición familiar en cada producto</p>
                    <div className="hero-buttons">
                        <button onClick={handleNavigateToLogin} className="cta-button">Ver Inventario</button>
                        <button onClick={handleNavigateToLogin} className="cta-button secondary">Agregar Producto</button>
                    </div>
                </div>
            </section>
            <main>
                <section className="inventory-summary">
                    <h2>Gestión de Productos</h2>
                    <div className="container">
                        <div className="category-section">
                            <h3>Mermeladas</h3>
                            <div className="div-img">
                                <Card 
                                    ImagenOrigen={"../public/Mermelada.jpg"} 
                                    Alt={"Mermelada"} 
                                    stock={15}
                                    categoria="Mermeladas"
                                />
                            </div>
                        </div>
                        
                        <div className="category-section">
                            <h3>Conservas</h3>
                            <div className="div-img">
                                <Card 
                                    ImagenOrigen={"../public/Conservas.jpg"} 
                                    Alt={"Conservas"} 
                                    stock={20}
                                    categoria="Conservas"
                                />
                            </div>
                        </div>
                        
                        <div className="category-section">
                            <h3>Salsas</h3>
                            <div className="div-img">
                                <Card 
                                    ImagenOrigen={"../public/Salsa.jpg"} 
                                    Alt={"Salsa"} 
                                    stock={10}
                                    categoria="Salsas"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main> 
        </>
    )
}

export default VistaPrincipal
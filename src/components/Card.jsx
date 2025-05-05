import './Card.css'
function Card({ImagenOrigen,Alt}){
    return(
        <div className="divImg">
        <img className="img" src={ImagenOrigen} alt={Alt} />
        </div>
    )
}

export default Card
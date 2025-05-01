function Card({ImagenOrigen,Alt}){
    return(
        <img className="img" src={ImagenOrigen} alt={Alt} />
    )
}

export default Card
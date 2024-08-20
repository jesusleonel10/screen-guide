import formatDateYear from "./../functions/formatDateYear";

const ItemSearch = ({id, title, poster, mediaType, year, character, setId, setMedia, setTypeDetails, setShowDetails}) => {

    const handleClick = (id, media) => {
        setId(id)
        setMedia(media)
        //Si la flag de typeDetails esta definida la cambiamos
        setTypeDetails && setTypeDetails(media)
        //Si la flag de showDetails esta definida la pasamos a true
        //Esta es para poder mostrar quitar ResultList y mostrar Details al hacer click en algun resultado
        setShowDetails && setShowDetails(true)
    }
    
    return (
        <>
        {
            poster && 
            <li className="item-list" onClick={() => handleClick(id, mediaType)}>
                <div className="item-list__poster">
                    <img className='' alt="Poster de la pelicula o serie de tv" src={`https://image.tmdb.org/t/p/w500/${poster}`}></img>
                </div>
                <div className="item-list__title">
                   <p>{title}</p>
                   {character && <p className="character">Personaje: <span>{character}</span></p>}
                </div>
                {year && <span className="item-list__year">{formatDateYear(year)}</span>}
            </li>
        }
        </>
    );
}
 
export default ItemSearch;
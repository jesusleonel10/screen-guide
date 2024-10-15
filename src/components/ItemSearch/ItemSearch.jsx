import formatDateYear from "./../../functions/formatDateYear";

const ItemSearch = ({id, title, poster, mediaType, year, character, from, setId, setMedia, setTypeDetails, setShowDetails}) => {

    const typeItem = [
        { id: 0, type: 'movie',  valor: 'Película'},
        { id: 1, type: 'tv',  valor: 'Serie de TV'},                  
        { id: 2, type: 'person',  valor: 'Persona'}          
    ]

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
                {from === 'results' ? 
                    typeItem.filter((item) => item.type === mediaType)
                    .map((element, index) => {
                        return <span className="item-list__media" key={index} >{element.valor}</span> 
                    })
                    : null
                    }
                {year && <span className="item-list__year">{formatDateYear(year)}</span>}
            </li>
        }
        </>
    );
}
 
export default ItemSearch;
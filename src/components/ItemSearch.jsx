import formatDateYear from "./../functions/formatDateYear";

const ItemSearch = ({id, title, poster, mediaType, year, character, setId, setMedia, setChangeDetails}) => {

    const handleClick = (id, media) => {
        setId(id)
        setMedia(media)
        setChangeDetails(true)
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
                   <p className="character">Personaje: <span>{character}</span></p>
                </div>
                <span className="item-list__media">{mediaType === 'tv' ? 'Serie de TV' : 'Película'}</span>
                <span className="item-list__year">{formatDateYear(year)}</span>
            </li>
        }
        </>
    );
}
 
export default ItemSearch;
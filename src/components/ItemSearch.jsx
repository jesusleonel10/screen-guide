import formatDateYear from "./../functions/formatDateYear";
import './../scss/ItemSearch.scss'

const ItemSearch = ({id, title, poster, mediaType, year, setId, setMedia, setShowDetails}) => {

    const handleClick = (id, media) => {
        setId(id)
        setMedia(media)
        setShowDetails(true)
    }
    
    return (
        <>
            <li className="item-list" onClick={() => handleClick(id, mediaType)}>
                <div className="item-list__poster">
                    <img className='' alt="Poster de la pelicula o serie de tv" src={`https://image.tmdb.org/t/p/w500/${poster}`}></img>
                </div>
                <p className="item-list__title">{title}</p>
                <span className="item-list__media">{mediaType === 'tv' ? 'Serie de TV' : 'Película'}</span>
                <span className="item-list__year">{formatDateYear(year)}</span>
            </li>
        </>
    );
}
 
export default ItemSearch;
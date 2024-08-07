import {useContext} from 'react'
import { Fragment } from "react";
import formatDateYear from "./../functions/formatDateYear";
import { ContextQuery } from '../context/contextQuery';
import './../scss/ItemSearch.scss'

const ItemSearch = ({id, title, poster, mediaType, year, votes, votesCount}) => {

    const {modal, setModal, setIdQuery, setMediaType} = useContext(ContextQuery)

    const handleClick = (id, mediatype) => {
        //Creamos una copia del estado global, luego cambiamos la propiedad type y por actualizamos el estado global
        const updateModal = {...modal}
        updateModal.type = 'details'
        setModal(updateModal)

        setIdQuery(id)
        setMediaType(mediatype)
    }
    
    return (
        <Fragment>
            <li className="item-list" onClick={() => handleClick(id, mediaType)}>
                <div className="item-list__poster">
                    <img className='' alt="Poster de la pelicula o serie de tv" src={`https://image.tmdb.org/t/p/w500/${poster}`}></img>
                </div>
                <p className="item-list__title">{title}</p>
                <span className="item-list__media">{mediaType === 'tv' ? 'Serie de TV' : 'Película'}</span>
                <span className="item-list__year">{formatDateYear(year)}</span>
            </li>
        </Fragment>
    );
}
 
export default ItemSearch;
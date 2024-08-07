import {useContext} from 'react'
import './../scss/Card.scss'
import formatDate from '../functions/formatDate'
import Votes from './Votes'
import { ContextQuery } from '../context/contextQuery';


const Card = ({id, poster, title, votes, votes_count, release, overview}) => {
    const {modal, setModal, setIdQuery} = useContext(ContextQuery)


    const handleClick = () => {
        //Creamos una copia del estado global, luego cambiamos la propiedad type y por actualizamos el
        const updateModal = {...modal}
        updateModal.type = 'details'
        setModal(updateModal)

        setIdQuery(id)
    }

    return (
        <div className='card-movie-tv' onClick={() => {handleClick()}}>
            <div className="card-movie-tv__poster">
                <img className='' alt="Poster de la pelicula o serie de tv" src={`https://image.tmdb.org/t/p/w500/${poster}`}></img>
            </div>
            <div className="card-movie-tv__details">
                <h1 className='card-movie-tv__title'>{title}</h1>
                <h2>{
                        `${formatDate(release)}`
                    }</h2>
                <div className="card-movie-tv__rating">
                    <Votes valor={votes} cantidad={votes_count}/>
                </div>
                <p className="card-movie-tv__overview">
                    {overview}
                </p>     
            </div>
        </div>
    );
}
 
export default Card

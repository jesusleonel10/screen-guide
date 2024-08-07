import {useState, useEffect, useContext} from 'react'
import './../scss/Details.scss'
import formatDate from '../functions/formatDate'
import formatTime from '../functions/formatTime'
import showLoading from '../functions/showLoading'
import WatchProvider from './WatchProvider'
import Credits from './Credits'
import Loading from './Loading'             
import { ContextQuery } from '../context/contextQuery';

const Details = () => {
    const {mediaType, idQuery} = useContext(ContextQuery)

    const [details, setDetails] = useState({})
    const [loadingDetails, setloadingDetails] = useState(true);

//LLamada a la API
  useEffect(() => {
    // setLoadingModal(true)
    const loadDetailsMovie = async() => {
      const url = `https://api.themoviedb.org/3/${mediaType}/`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTQ5NDE0YTUyNmIyMzU0Mzk4OTczNWJhMjFhZTNkNSIsInN1YiI6IjY2NGI3Njg5MTMxY2Y2YzE2ODdjZTM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d2VJdOe_Mdkicyrlm_CGZREryZU8xC23wr0K_QAdIF8'
        }
      };
        try {
            const response = await fetch(`${url}${idQuery}?language=es-MX`, options)
            if(response.status === 200) {
                const data = await response.json()
                //Actualizamos el state con la respuesta del json
                setDetails(data)
                
            } else if (response.status === 401){
                console.log('Llave incorrecta');
            } else if(response.status === 404){
                console.log('La pelicula o serie de TV no existe');
            } else {
                console.log('Hubo un error');
            }
        } catch (error) {
            console.log(error);
        }
        showLoading(800, setloadingDetails, false)

    }
    loadDetailsMovie()
    
}, [idQuery, mediaType])

    return (  
        <>
        {loadingDetails ?
            <Loading />
            :
            <div className='container-modal__content'>
                <div className='poster'>
                    <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt="Poster of the movie" />
                </div>
                <div className="details_movie">
                    <div className="title">
                        <h2>{details.title || details.name}</h2>
                        <div className='release'><h4>Fecha de Estreno:</h4><p>{formatDate(details.release_date || details.first_air_date)}</p></div>
                    </div>
                    <div className='overview'>
                        <h3>Resumen:</h3><p>{details.overview}</p>
                    </div>
                    <div className='genres'>
                        <h3>Generos:</h3> 
                            {
                                details.genres?.map((item, index) => {
                                    return <p className='genre' key={index}>{item.name}</p>
                                })
                            }
                    </div>
                    <div className="runtime">
                            {
                                mediaType === 'movie' ?
                                <>
                                    <h3>Duración:</h3><p>{formatTime(details.runtime)}</p>
                                </>
                                :
                                <>
                                    <h3>Temporadas:</h3><p>{details.number_of_seasons}</p>
                                </>
                            }
                            </div>
                    <div className="country">
                        <h3>Pais de Origen:</h3>
                        {
                            details.production_countries?.map((item, index) => {
                                return <p key={index}>{item.name}</p>
                            })
                        }
                    </div>
                    <div className="languague">
                        <h3>Idioma:</h3>
                        {
                            details.spoken_languages?.map((item, index) => {
                                return <p key={index}>{item.english_name}</p>
                            })
                        }
                    </div>
                </div>
                <div className='widgets'>
                    <Credits 
                        idQuery={idQuery}
                        mediatype={mediaType}
                    />
                    <WatchProvider 
                        idQuery={idQuery}
                        mediatype={mediaType}
                    />
                </div>
            </div>
        }
        </>
    );
}
 
export default Details;
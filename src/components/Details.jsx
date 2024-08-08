import './../scss/Details.scss'
import formatDate from '../functions/formatDate'
import formatTime from '../functions/formatTime'
import useFetchData from '../hooks/useFetchData'
import WatchProvider from './WatchProvider'
import Credits from './Credits'
import Loading from './Loading'             

const Details = ({id, media}) => {
    //Custom hook para hacer la consulta a la API
    const { data, loading } = useFetchData(`https://api.themoviedb.org/3/${media}/${id}?language=es-MX`, media)
    return (  
        <>
        {loading ?
            <Loading />
            :
            <div className='container-modal__content'>
                <div className='poster'>
                    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt="Poster of the movie" />
                </div>
                <div className="details_movie">
                    <div className="title">
                        <h2>{data.title || data.name}</h2>
                        <div className='release'><h4>Fecha de Estreno:</h4><p>{formatDate(data.release_date || data.first_air_date)}</p></div>
                    </div>
                    <div className='overview'>
                        <h3>Resumen:</h3><p>{data.overview}</p>
                    </div>
                    <div className='genres'>
                        <h3>Generos:</h3> 
                            {
                                data.genres?.map((item, index) => {
                                    return <p className='genre' key={index}>{item.name}</p>
                                })
                            }
                    </div>
                    <div className="runtime">
                            {
                                media === 'movie' ?
                                <>
                                    <h3>Duración:</h3><p>{formatTime(data.runtime)}</p>
                                </>
                                :
                                <>
                                    <h3>Temporadas:</h3><p>{data.number_of_seasons}</p>
                                </>
                            }
                            </div>
                    <div className="country">
                        <h3>Pais de Origen:</h3>
                        {
                            data.production_countries?.map((item, index) => {
                                return <p key={index}>{item.name}</p>
                            })
                        }
                    </div>
                    <div className="languague">
                        <h3>Idioma:</h3>
                        {
                            data.spoken_languages?.map((item, index) => {
                                return <p key={index}>{item.english_name}</p>
                            })
                        }
                    </div>
                </div>
                <div className='widgets'>
                    <Credits 
                        idQuery={id}
                        mediatype={media}
                    />
                    <WatchProvider 
                        idQuery={id}
                        mediatype={media}
                    />
                </div>
            </div>
        }
        </>
    );
}
 
export default Details;
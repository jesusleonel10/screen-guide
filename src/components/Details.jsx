import formatDate from "../functions/formatDate";
import formatTime from "../functions/formatTime";

const Details = ({poster, name, date, overview, genres, media, runtime, number_of_seasons, production, languages}) => {
    return (
            <>
                <div className='poster'>
                    <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="Poster de la pelicula o serie de TV" />
                </div>
                <div className="details_movie">
                    <div className="title">
                        <h2>{name}</h2>
                        <div className='release'><h4>Fecha de Estreno:</h4><p>{formatDate(date)}</p></div>
                    </div>
                    <div className='overview'>
                        <h3>Resumen:</h3><p>{overview}</p>
                    </div>
                    <div className='genres'>
                        <h3>Generos:</h3> 
                            {
                                genres?.map((item, index) => {
                                    return <p className='genre' key={index}>{item.name}</p>
                                })
                            }
                    </div>
                    <div className="runtime">
                            {
                                media === 'movie' ?
                                <>
                                    <h3>Duración:</h3><p>{formatTime(runtime)}</p>
                                </>
                                :
                                <>
                                    <h3>Temporadas:</h3><p>{number_of_seasons}</p>
                                </>
                            }
                            </div>
                    <div className="country">
                        <h3>Pais de Origen:</h3>
                        {
                            production?.map((item, index) => {
                                return <p key={index}>{item.name}</p>
                            })
                        }
                    </div>
                    <div className="languague">
                        <h3>Idioma:</h3>
                        {
                            languages?.map((item, index) => {
                                return <p key={index}>{item.english_name}</p>
                            })
                        }
                    </div>
                </div>
            </>
        );
}
 
export default Details;
import './../scss/Details.scss'
import useFetchData from '../hooks/useFetchData'
import Details from './Details'
import WatchProvider from './WatchProvider'
import Credits from './Credits'
import Loading from './Loading' 
           

const Info = ({id, media}) => {
    //Custom hook para hacer la consulta a la API
    const { data, loading } = useFetchData(`https://api.themoviedb.org/3/${media}/${id}?language=es-MX`, media)


    return (  
        <>
        {loading ?
            (<Loading />)
            : data &&
            (<div className='container-modal__content'>
                    <Details 
                        poster={data.poster_path}
                        name={data.title || data.name}
                        date={data.release_date || data.first_air_date}
                        overview={data.overview}
                        genres={data.genres}
                        media={media}
                        runtime={data.runtime}
                        number_of_seasons={data.number_of_seasons}
                        production={data.production_countries}
                        languages={data.spoken_languages}
                    />
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
            </div>)
            }
        </>
    );
}
 
export default Info;
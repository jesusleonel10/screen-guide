import { useEffect, useState } from 'react';
import ItemContainer from './ItemContainer'
import Loading from './Loading';
import useFetchData from '../hooks/useFetchData';

import './../scss/Filmography.scss'

const Filmography = ({idDetails, mediaDetails, setChangeDetails, setIdDetails, setMediaDetails}) => {
    //Estado para guardar la nueva consulta
    const [filmography, setFilmography] = useState(null);
    const [onlyMovies, setOnlyMovies] = useState(null);
    const [onlySeries, setOnlySeries] = useState(null);
    const {data, loading} = useFetchData(`https://api.themoviedb.org/3/person/${idDetails}/combined_credits?language=es-MX`, mediaDetails)

    useEffect(() => {
        
        const filterResults = (obj) => {
            const onlyCastNoEpisodes = obj && obj
            .filter((item) => !item.genre_ids
            .some((element) => element === 10767 || element === 10763 || element === 10764))
            const movieslistForActor = onlyCastNoEpisodes?.filter((item) => item.media_type === 'movie').sort((a, b) => b.popularity - a.popularity)
            const seriesListForActor = onlyCastNoEpisodes?.filter((item) => item.media_type === 'tv').sort((a, b) => b.popularity - a.popularity)
            setOnlyMovies(movieslistForActor)
            setOnlySeries(seriesListForActor)
            setFilmography(onlyCastNoEpisodes)
        }
        
        filterResults(data.cast)
    }, [data]);

    // console.log(data.cast);

    return (
        <>
            <div className="filmography">
            {
                loading ?
                <Loading />
                :
                    <>
                        <h2 className='filmography__title'>Películas y Series</h2>
                        <ItemContainer 
                            dataList={filmography}
                            listMovies={onlyMovies}
                            listSeries={onlySeries}
                            setId={setIdDetails}
                            setMedia={setMediaDetails}
                            setChangeDetails={setChangeDetails}
                        />
                    </>
                }
            </div>
       </>
    );
}
 
export default Filmography;
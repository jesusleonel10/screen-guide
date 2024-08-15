import { useEffect, useState } from 'react';
import ItemContainer from './ItemContainer'
import Loading from './Loading';
import useFetchData from '../hooks/useFetchData';

const Filmography = ({idDetails, mediaDetails, setChangeDetails, setIdDetails, setMediaDetails}) => {
    //Estado para guardar la nueva consulta
    const [filmography, setFilmography] = useState([]);
    const {data, loading} = useFetchData(`https://api.themoviedb.org/3/person/${idDetails}/combined_credits?language=es-MX`, mediaDetails)

    useEffect(() => {
        
        const filterResults = (obj) => {
            const onlyCastNoEpisodes = obj && obj.filter((item) => item.character !== 'Self' || item.character !== 'Herself')
            setFilmography(onlyCastNoEpisodes)
        }
        
        filterResults(data.cast)
    }, [data]);

    // console.log(data.cast);

    return (
       <>
            {
                loading ?
                <Loading />
                :
                <ItemContainer 
                    dataList={filmography}
                    setId={setIdDetails}
                    setMedia={setMediaDetails}
                    setChangeDetails={setChangeDetails}
                />
            }
       </>
    );
}
 
export default Filmography;
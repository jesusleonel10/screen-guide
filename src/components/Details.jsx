import MovieSeriesTV from "./MovieSeriesTV";
import People from "./People"
import Loading from "./Loading";
import useFetchData from '../hooks/useFetchData'

import './../scss/Details.scss'

const Details = ({changeDetails, idDetails, mediaDetails}) => {
    //Con esta funcion primero verifico el type, para luego si usar el hook dependiendo del type cambio el url para la llamada de la api
    const getUrl = (type) => {
        switch (type) {
            case true :
                return `https://api.themoviedb.org/3/${mediaDetails}/${idDetails}?language=es-MX`;
            case false:
                return `https://api.themoviedb.org/3/person/${idDetails}?language=es-MX`
            default:
                return  `https://api.themoviedb.org/3/${mediaDetails}/${idDetails}?language=es-MX`;
            }
        }
    const { data, loading } = useFetchData(getUrl(changeDetails), mediaDetails)

    return (
            <>
               {loading ?
                <Loading />
                : changeDetails ? <MovieSeriesTV data={data} /> : <People data={data} />
                }
            </>
        );
}
 
export default Details;
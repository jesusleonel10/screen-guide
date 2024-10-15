import MovieSeriesTV from "../MovieSeriesTV/MovieSeriesTV";
import People from "../People/People"
import Loading from "../Loading/Loading";
import useFetchData from '../../hooks/useFetchData'
import './Details.scss'

const Details = ({typeDetails, idDetails, mediaDetails}) => {
    /* 
    changeDetails lo recibo aqui para pasarselo al hook custom
    hago esto para cambiarle el valor al mismo tiempo que 'loading' en el hook
    de esta manera cuando changeDetails cambie, va a esperar al hook por que éste es asincrono
    con esto evito pasar del componente MovieSeriesTV a People antes de que el hook termine
    */
    //Con esta funcion primero verifico el type, para luego si usar el hook dependiendo del type cambio el url para la llamada de la api
    const getUrl = (type) => {
        switch (type) {
            case 'movie' :
                return `https://api.themoviedb.org/3/${mediaDetails}/${idDetails}?language=es-MX`;
            case 'tv' :
                return `https://api.themoviedb.org/3/${mediaDetails}/${idDetails}?language=es-MX`;
            case 'person':
                return `https://api.themoviedb.org/3/person/${idDetails}?language=en-US`
            default:
                return  `https://api.themoviedb.org/3/${mediaDetails}/${idDetails}?language=es-MX`;
            }
        }
    const { data, loading, changeFlag } = useFetchData(getUrl(typeDetails), mediaDetails, typeDetails)

    return (
            <>
               {loading ?
                <Loading />
                : changeFlag === 'movie' || changeFlag === 'tv' ? 
                <MovieSeriesTV data={data} media={mediaDetails}/> 
                : 
                <People data={data} />
                }
            </>
        );
}
 
export default Details;
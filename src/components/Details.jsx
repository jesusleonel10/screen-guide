import MovieSeriesTV from "./MovieSeriesTV";
import People from "./People"
import Loading from "./Loading";
import useFetchData from '../hooks/useFetchData'
import './../scss/Details.scss'

const Details = ({changeDetails, idDetails, mediaDetails}) => {
    /* 
    changeDetails lo recibo aqui para pasarselo al hook custom
    hago esto para cambiarle el valor al mismo tiempo que 'loading' en el hook
    de esta manera cuando changeDetails cambie, va a esperar al hook por que éste es asincrono
    con esto evito pasar del componente MovieSeriesTV a People antes de que el hook termine
    */
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
    const { data, loading, changeFlag } = useFetchData(getUrl(changeDetails), mediaDetails, changeDetails)

    return (
            <>
               {loading ?
                <Loading />
                :  changeFlag ? <MovieSeriesTV data={data}/> : <People data={data} />
                }
            </>
        );
}
 
export default Details;
import {useState, useEffect} from 'react'
import Loading from './Loading'
import ItemSearch from './ItemSearch'
import useFetchData from '../hooks/useFetchData'
import Info from './Info'
import Pages from './Pages'

import './../scss/ResultsList.scss'


const ResultsList = ({inputSearch}) => {
    //Esta flag para poder mostrar o no el Details dentro del modal que ya esta renderizado
    const [showDetails, setShowDetails] = useState(false);
    const [id, setId] = useState('');
    const [media, setMedia] = useState('');

    const [empty, setEmpty] = useState(false);

    //Estado del input al iniciar sera el del input anterior
    const [inputSearchList, setInputSearchList] = useState(inputSearch);
    //Estado para guardar la nueva consulta
    const [listQuery, setListQuery] = useState([]);
    //Paginacion
    const [page, setPage] = useState(1);
    const { data, loading } = useFetchData(`https://api.themoviedb.org/3/search/multi?query=${inputSearchList}&include_adult=false&language=es-MX&page=${page}`, inputSearchList)
    
    useEffect(() => {

        //Filtro los datos para que solo sean películas y series de tv
        const filterResults = (obj) => {
            const onlyMoviesAndTv = obj.results && obj.results.filter((item) => item.media_type !== 'person')
            setListQuery(onlyMoviesAndTv)
        }

        filterResults(data)
     }, [data]);

    //Capturar cada cambio en el input text
    const handleChange = (setState) => (event) => {
        //Reseteamos la paginacion a 1 por cada nueva busqueda
        setPage(1)
        /*Si esta vacio el input ponemos el estado en vacio para no mostrar nada en el mismo input
        para poder que input conserve la cadena desde el buscador anterior y paso la bandera a true
        al estar vacia
        */
        if(event.target.value === ''){
            setState('')
            setEmpty(true)
            setPage(0)
        } else {
            //Capturamos lo que se ingrese en este input
            //La bandera empty pasa a false ya que no esta vacio el input
            setState(event.target.value)
            setEmpty(false)
        }
    }
    return (
        <>
            {showDetails ?
                    <Info 
                        id={id}
                        media={media}
                    />
                :
                <div className="container-modal__search">
                    <div className="input">
                        <form action="" >
                            <label className='hidden-visually' htmlFor="search">Buscar</label>
                            <input 
                                id="search" 
                                type="text" 
                                placeholder="Ingresa el nombre de alguna película o serie de TV" 
                                required="required"
                                value={inputSearchList}
                                //Capturamos cada cambio en el input y lo actualizamos al estado global
                                onChange={handleChange(setInputSearchList)}
                            />
                        </form>
                    </div>
                    <div className="list">
                        {empty ?
                            <div className="empty">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                               <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                            </div>
                            : loading ?
                            <Loading />
                            :
                        <ul>
                            {
                            
                                listQuery?.map((item, index) => {
                                        return <ItemSearch 
                                            key={index}
                                            id={item.id}
                                            poster={item.poster_path}
                                            title={item.name || item.title}
                                            mediaType={item.media_type}
                                            year={item.release_date || item.first_air_date}
                                            votes={item.vote_average}
                                            votesCount={item.vote_count}
                                            setId={setId}
                                            setMedia={setMedia}
                                            setShowDetails={setShowDetails}
                                        />
                                })
                            }
                        </ul>
                            }
                    </div>
                    <Pages 
                        page={page}
                        setPage={setPage}
                    />
                </div>
            }
        </>
    );
}
 
export default ResultsList;
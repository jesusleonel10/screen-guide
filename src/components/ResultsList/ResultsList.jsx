import {useState, useEffect} from 'react'
import useFetchData from '../../hooks/useFetchData'
import Loading from '../Loading/Loading'
import Info from '../Info/Info'
import Pages from '../Pages/Pages'
import ItemContainer from '../ItemContainer/ItemContainer'
import './ResultsList.scss'

const ResultsList = ({inputSearch}) => {
    //Esta flag para poder mostrar o no el Details dentro del modal que ya esta renderizado
    const [showDetails, setShowDetails] = useState(false);

    const [id, setId] = useState(null);
    const [media, setMedia] = useState(null);
    //Flag para saber si el input esta vacio o no
    const [empty, setEmpty] = useState(false);

    //Estado del input al iniciar sera el del input anterior
    const [inputSearchList, setInputSearchList] = useState(inputSearch);
    //Estado para guardar la nueva consulta
    const [listQuery, setListQuery] = useState(null);

    //Paginacion
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    //Consulta a la api
    const { data, loading } = useFetchData(`https://api.themoviedb.org/3/search/multi?query=${inputSearchList}&include_adult=false&language=es-MX&page=${page}`, inputSearchList)
    
    useEffect(() => {
        //Aqui solamente filtro para pasar los datos que estan dentro de .results
        const filterResults = (obj) => {
            const results = obj.results
            setListQuery(results)
        }

        filterResults(data)
        setTotalPages(data.total_pages)

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
            //Si es true, quito el ResultList para mostrar Info el resto de componentes dentro de él
                    <Info 
                        id={id}
                        media={media}
                        type={media}
                    />
                :
                <div className="container-modal__search">
                    <div className="input">
                        <form action="" >
                            <label className='hidden-visually' htmlFor="search">Buscar</label>
                            <input 
                                id="search" 
                                type="text" 
                                placeholder="Ingresa el nombre de alguna película, serie de TV o celebridad" 
                                required="required"
                                value={inputSearchList}
                                //Capturamos cada cambio en el input y lo actualizamos al estado global
                                onChange={handleChange(setInputSearchList)}
                            />
                        </form>
                    </div>
                        {empty ?
                            <div className="empty">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                               <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                            </div>
                            : loading ?
                            <Loading />
                            :
                            <ItemContainer
                                from={'results'} 
                                dataList={listQuery}
                                setId={setId}
                                setMedia={setMedia}
                                setShowDetails={setShowDetails}
                            />
                            }
                            <Pages 
                                page={page}
                                setPage={setPage}
                                totalpages={totalPages}
                            />
                </div>
            }
        </>
    );
}
 
export default ResultsList;
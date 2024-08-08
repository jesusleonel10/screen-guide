import {useState, useEffect} from 'react'
import Loading from './Loading'
import ItemSearch from './ItemSearch'
import useFetchData from '../hooks/useFetchData'
import Details from './Details'

import './../scss/ModalSearch.scss'


const ModalSearch = ({inputSearch, setInputSearch}) => {

    const [showDetails, setShowDetails] = useState(false);
    const [id, setId] = useState('');
    const [media, setMedia] = useState('');

    //Estado local para las paginas y los resultados filtrados
    const [listQuery, setListQuery] = useState([]);
    const [page, setPage] = useState(1);
    const { data, loading } = useFetchData(`https://api.themoviedb.org/3/search/multi?query=${inputSearch}&include_adult=false&language=es-MX&page=${page}`, inputSearch)
    
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
        setState(event.target.value)
    }
    console.log(id, media);
    return (
        <>
            <div className="container-modal__search">
                    <div className="input">
                        <form action="" >
                            <label className='hidden-visually' htmlFor="search">Buscar</label>
                            <input 
                                id="search" 
                                type="text" 
                                placeholder="Ingresa el nombre de alguna película o serie de TV" 
                                required="required"
                                value={inputSearch}
                                //Capturamos cada cambio en el input y lo actualizamos al estado global
                                onChange={handleChange(setInputSearch)}
                            />
                        </form>
                    </div>
                    <div className="list">
                        {loading ?
                            <Loading />
                            :
                        <ul>
                            {listQuery?.map((item, index) => {
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
                    <div className="search-pages">
                        {
                            page === 1 ?
                            <button onClick={() => page > 1 ? setPage(page - 1) : false} disabled='disabled'>Anterior</button>
                            :
                            <button onClick={() => page > 1 ? setPage(page - 1) : false}>Anterior</button>

                        }
                        <button onClick={() => page < 1000 ? setPage(page + 1) : false}>Siguente</button>
                    </div>
                </div>
                {showDetails ?
                    <Details 
                        id={id}
                        media={media}
                    />
                :
                    null
                }
        </>
    );
}
 
export default ModalSearch;
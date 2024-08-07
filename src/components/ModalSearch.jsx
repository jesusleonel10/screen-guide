import {useState, useEffect} from 'react'
import showLoading from '../functions/showLoading'
import Loading from './Loading'
import ItemSearch from './ItemSearch'
import './../scss/ModalSearch.scss'


const ModalSearch = ({inputSearch, setInputSearch}) => {
    //Estado global para ser usado en la consulta API
    const [listQuery, setListQuery] = useState({});
    //Primera flag para la animacion de carga del modal nada mas
    const [loadingModalSearch, setLoadingModalSearch] = useState(true);
    //Segunda flag para mostrar animacion al cargar la lista dentro del modal
    const [loadingResults, setLoadingResults] = useState(false);
    const [page, setPage] = useState(1);
    

    useEffect(() => {

        const loadQuerySearch = async(search) => {
            //Hacemos esta flag true para que cada vez que se ejecute la funcion muestre la animacion de carga
            setLoadingResults(true)
                const url = `https://api.themoviedb.org/3/search/multi?query=`
                const options = {
                  method: 'GET',
                  headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTQ5NDE0YTUyNmIyMzU0Mzk4OTczNWJhMjFhZTNkNSIsInN1YiI6IjY2NGI3Njg5MTMxY2Y2YzE2ODdjZTM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d2VJdOe_Mdkicyrlm_CGZREryZU8xC23wr0K_QAdIF8'
                  }
                };
          
                  try {
                      const response = await fetch(`${url}${search}&include_adult=false&language=es-MX&page=${page}`, options)
                      if(response.status === 200) {
                          const data = await response.json()
                          setListQuery(data.results)
                      } else if (response.status === 401){
                          console.log('Llave incorrecta');
                      } else if(response.status === 404){
                          console.log('No se encontro la pelicula o serie');
                      } else {
                          console.log('Hubo un error');
                      }
                  } catch (error) {
                      console.log(error);
                  }
                //La primera flag la hacemos false la mostrar el modal primero
                showLoading(500, setLoadingModalSearch, false)
                //La segunda flag la hacemos false para mostra la lista dentro del modal
                showLoading(700, setLoadingResults, false)
        }

        loadQuerySearch(inputSearch)

    }, [inputSearch, page, setLoadingModalSearch]);

    //Capturar cada cambio en el input text
    const handleChange = (setState) => (event) => {
        setState(event.target.value)
    }

    return (
        <>
            {loadingModalSearch ?
                <Loading />
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
                                            value={inputSearch}
                                            //Capturamos cada cambio en el input y lo actualizamos al estado global
                                            onChange={handleChange(setInputSearch)}
                                        />
                                        {/* <input type="submit" value="Buscar" onClick={handleClick} /> */}
                                    </form>
                                </div>
                                <div className="list">
                                    {loadingResults ?
                                        <Loading />
                                        :
                                    <ul>
                                        {listQuery.filter((item) => item.media_type !== 'person').map((item, index) => {
                                                return <ItemSearch 
                                                    key={index}
                                                    id={item.id}
                                                    poster={item.poster_path}
                                                    title={item.name || item.title}
                                                    mediaType={item.media_type}
                                                    year={item.release_date || item.first_air_date}
                                                    votes={item.vote_average}
                                                    votesCount={item.vote_count}
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
                    }
        </>
    );
}
 
export default ModalSearch;
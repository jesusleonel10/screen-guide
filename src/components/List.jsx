import {useState, useEffect, useContext, Fragment} from 'react'
import Filters from "./Filters";
import Details from './Details';
import Card from "./Card"
import showLoading from '../functions/showLoading';
import { ContextQuery } from '../context/contextQuery';
import Modal from './Modal';

import styled from 'styled-components';
import './../scss/List.scss'

const List = ({category, setCategory}) => { 
    //Estado global
    const {mediaType, modal} = useContext(ContextQuery)
    //Estados locales
    const [query, setQuery] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingCards, setLoadingCards] = useState(true);
    

    //Llamada a la API
    useEffect(() => {
        //Hago true esta flag para mostrar la animacion de carga cada vez que se ejecuta la consulta a la API ademas de que es un mismo componente
        setLoadingCards(true)
        const loadListOfItems = async() => {
        //Comprobar primero su mediatype esta definido, mas que nada para cuando la pagina se refresca
        if(mediaType) { 
          const url = `https://api.themoviedb.org/3/${mediaType}/`
    
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTQ5NDE0YTUyNmIyMzU0Mzk4OTczNWJhMjFhZTNkNSIsInN1YiI6IjY2NGI3Njg5MTMxY2Y2YzE2ODdjZTM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d2VJdOe_Mdkicyrlm_CGZREryZU8xC23wr0K_QAdIF8'
            }
          };
    
            try {
                const response = await fetch(`${url}${category}?&language=es-MX&page=${page}`, options)
                if(response.status === 200) {
                    const data = await response.json()
                    setQuery(data.results)
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
                showLoading(800, setLoadingCards, false)
            }
        }
        loadListOfItems()

    }, [page, category, mediaType]);

    const arrCardLoading = [1,2,3,4,5,6,7,8]

    return (
        <>
            <Filters 
                setPage={setPage}
                mediatype={mediaType}
                setCategory={setCategory}
        />
        <div className='cards-container'>
        { 
        loadingCards ?
            arrCardLoading.map((item) => (
                    <Fragment key={item}>
                        <CardLoading>
                            <Content />
                        </CardLoading>
                    </Fragment>
                ))
        :
        query.map((element) => {
            return <Card
                id={element.id}
                key={element.id}
                poster={element.poster_path} 
                title={element.name || element.title}
                release={element.release_date || element.first_air_date}
                runtime={element.runtime}
                overview={element.overview}
                votes={element.vote_average}
                votes_count={element.vote_count}
            />
            })
        }
        </div>
        <div className="pages">
        {
            page === 1 ?
            <button onClick={() => page > 1 ? setPage(page - 1) : false} disabled='disabled'>Anterior</button>
            :
            <button onClick={() => page > 1 ? setPage(page - 1) : false}>Anterior</button>

        }
        <button onClick={() => page < 1000 ? setPage(page + 1) : false}>Siguente</button>
        </div>
        {
            //Al cambiar el type cambio el componente dentro de modal
            modal.type === 'details' ?
            <Modal header='Información' >
                <Details />
            </Modal>
            : null
        }
        </>
    );
}
 
export default List;

const CardLoading = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #fff;
    border-radius: 15px;
`;

const animationCard = () => {
    return {
        background: 'linear-gradient(90deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
        borderRadius: '5px',
        backgroundSize: '200% 100%',
        animation: '1s shine linear infinite',
    };
}

const Content = styled.div`
    height: 330px;
    border-radius: 1.125rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    ${animationCard()}
`;
import {useState, useContext, Fragment} from 'react'
import Filters from "./Filters";
import Details from './Details';
import Card from "./Card"
import { ContextQuery } from '../context/contextQuery';
import Modal from './Modal';
import useFetchData from '../hooks/useFetchData';

import styled from 'styled-components';
import './../scss/List.scss'

const List = ({category, setCategory}) => { 
    //Estado global
    const {mediaType, modal} = useContext(ContextQuery)
    //Estados locales
    const [page, setPage] = useState(1);
    //Custom hook para hacer la consulta a la API
    const { data, loading } = useFetchData(`https://api.themoviedb.org/3/${mediaType}/${category}?language=es-MX&page=${page}`, mediaType)


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
            loading ?
                arrCardLoading?.map((item) => (
                        <Fragment key={item}>
                            <CardLoading>
                                <Content />
                            </CardLoading>
                        </Fragment>
                    ))
            :
                data?.results?.map((element) => {
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
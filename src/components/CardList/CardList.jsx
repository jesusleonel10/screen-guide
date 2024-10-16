import {useState, Fragment, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import Filters from "../Filters/Filters";
import Info from '../Info/Info';
import Card from "../Card/Card"
import Modal from '../Modal/Modal';
import useFetchData from '../../hooks/useFetchData';
import formatLocation from '../../functions/formatLocation';
import Pages from '../Pages/Pages';

import styled from 'styled-components';
import './CardList.scss'

const CardList = () => { 
    //Flag para mostrar o no el modal
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);

    const [id, setId] = useState(null);
    const [media, setMedia] = useState(null);
    //Definir el filtro de la busqueda entre popular, mejores valorados etc...
    const [category, setCategory] = useState('popular');
    //Estado para obtener la ruta actual
    const location = useLocation()
    //Custom hook para hacer la consulta a la API
    const { data, loading } = useFetchData(`https://api.themoviedb.org/3/${media}/${category}?language=es-MX&page=${page}`, media)

    const arrCardLoading = [1,2,3,4,5,6,7,8]

    useEffect(() => {
      setMedia(formatLocation(location.pathname))
      setCategory('popular')
      setPage(1)
    }, [location]);
    
    return (
            <>
                <Filters 
                    setPage={setPage}
                    mediatype={media}
                    setCategory={setCategory}
                />
                <Pages 
                    page={page}
                    setPage={setPage}
                />
                <div className='cards-container'>
                { 
                loading ?
                    (arrCardLoading.map((item) => (
                            <Fragment key={item}>
                                <CardLoading />
                            </Fragment>
                        )))
                :
                    (data.results.map((element) => {
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
                            setId={setId}
                            setModal={setModal}
                        />
                        }))
                }
                </div>
                <Pages 
                    page={page}
                    setPage={setPage}
                    footer={true}
                />
            {
                //Al cambiar el type cambio el componente dentro de modal
                modal &&
                <Modal header='Información' modal={modal} setModal={setModal}>
                    <Info 
                        id={id}
                        media={media}
                        type={media}
                    />
                </Modal>
             }
        </>
    );
}
 
export default CardList;


const animationCard = () => {
    return {
        background: 'linear-gradient(90deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
        borderRadius: '5px',
        backgroundSize: '200% 100%',
        animation: '1s shine linear infinite',
    };
}

const CardLoading = styled.div`
    min-width: 144px;
    min-height: 216px;
    border-radius: 1.125rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    ${animationCard()}
`;

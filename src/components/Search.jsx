import { useState, useEffect, useContext } from 'react';
import ModalSearch from './ModalSearch';
import Modal from './Modal';
import { ContextQuery } from '../context/contextQuery';
import InfiniteScroll from './InfiniteScroll'
import Tag from './Tag';

import './../scss/Search.scss'

const Search = ({trending}) => {
    const {modal, setModal} = useContext(ContextQuery)
    const [randomValue, setRandomValue] = useState(0);
    const [shuffleValue, setshuffleValue] = useState([]);
    //Definir el value de lo que se escribe en el input text para hacer la busqueda
    const [inputSearch, setInputSearch] = useState('');

    const image_per_row = 7;
    const rows = 5;
    
    useEffect(() => {
        const image = trending.slice(0, 12).map((poster) => poster.poster_path);
        const duration = 15000;
        const shuffle = (arr) => [...arr].sort( () => .5 - Math.random() );
        const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        
        setshuffleValue(shuffle(image))
        setRandomValue(random(duration - 5000, duration + 5000))
    }, [trending]);

    const handleChange = (setState) => (event) => {
        setState(event.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        if(inputSearch === '') {
            setModal(false)
        }else {
            //Creamos una copia del estado global, luego cambiamos la propiedad type y por actualizamos el estado global
            const updateModal = {...modal}
            updateModal.type = 'search'
            setModal(updateModal)
        }
    }

    return (
     <>   
        <div className="search-container">
            <div className="search-container__overlay" />

            <div className="search-container__title">
                <h2>Millones de películas y series para descubrir</h2>
            </div>
            <div className="search-container__input">
                <form action="">
                    <label className='hidden-visually' htmlFor="search">Buscar</label>
                        <input 
                            id="search" 
                            type="text" 
                            placeholder="Buscar película o serie de TV" 
                            required="required"
                            value={inputSearch}
                            onChange={handleChange(setInputSearch)}
                        />
                        <input type="submit" value="Buscar" onClick={(e) => handleClick(e)} />
                </form>
            </div>
            <div className='search-container__items-scrolling items-scrolling-infinite-list'>

                {[...new Array(rows)].map((_, i) => (
                    <InfiniteScroll key={i} duration={randomValue} reverse={i % 2}>
                    {shuffleValue.slice(0, image_per_row).map(tag => (
                        <Tag poster={tag} key={tag}/>
                    ))}
                    </InfiniteScroll>
                ))}
            </div>
        </div>
    {
            //Al cambiar el type cambio el componente dentro de modal
            modal.type === 'search' ?
            <Modal header='Buscar Película o Serie de TV'>
                <ModalSearch 
                    inputSearch={inputSearch}
                    setInputSearch={setInputSearch}
                />
            </Modal>
        : null    
    }
    </>
    )
}
 
export default Search;
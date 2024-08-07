import {useContext} from 'react'
import styled from "styled-components";
import { ContextQuery } from '../context/contextQuery';

const ItemSlider = ({id, mediatype, setMediaType, title, overview, poster, backdrop}) => {
    
    const {setModal, setIdQuery} = useContext(ContextQuery)

    const handleClick = (id, modal, mediatype) => {
        const updateModal = {...modal}
        updateModal.type = 'details'
        setModal(updateModal)

        setIdQuery(id)
        setMediaType(mediatype)
    }

    return (
        <>
            <Item 
                backdrop={backdrop} 
                baseurl='https://image.tmdb.org/t/p/original' 
                className='slider-container__item'
                style={
                    {backgroundImage: `url('https://image.tmdb.org/t/p/w500${poster}')`}
                }
            >
                <div className='slider-container__content'>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    <button onClick={() => handleClick(id, true, mediatype)} >Ver mas</button>
                </div>
            </Item>
        </>
      
    );
}
 
export default ItemSlider;

const Item = styled.li`
    &:nth-child(1), &:nth-child(2) {
        background-image: linear-gradient(to bottom right, rgb(2, 131, 145, 0.6), rgb(1, 32, 78, 0.8)), url(${props => props.baseurl + props.backdrop}) !important;
    }
`
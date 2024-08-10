import {useState, useEffect} from 'react'

import './../scss/Filters.scss'


const Filters = ({mediatype, setPage, setCategory}) => {

    const [categoryMenu, setCategoryMenu] = useState([]);

    const handleClick = () => {
        const items = document.querySelector('.category-container-mobile__buttons')
        items.classList.toggle('openbox')
    }

    useEffect(() => {
        const listCategory = (mediatype) => {
            if(mediatype === 'movie') {
                setCategoryMenu(
                    [
                        { id: 1, nombre: 'En Cartelera', valor: 'now_playing'},
                        { id: 2, nombre: 'Populares', valor: 'popular'},                  
                        { id: 3, nombre: 'Mejores Valorados', valor: 'top_rated'},          
                        { id: 4, nombre: 'Proximamente', valor: 'upcoming'}
                    ]
                    
                )
            } else if (mediatype === 'tv') {
                setCategoryMenu(
                [
                    { id: 1, nombre: 'Se emiten hoy', valor: 'airing_today'},
                    { id: 2, nombre: 'En transmision', valor: 'on_the_air'},                  
                    { id: 3, nombre: 'Populares', valor: 'popular'},          
                    { id: 4, nombre: 'Mejor Valoradas', valor: 'top_rated'}
                ]
            )
            }

        }
    listCategory(mediatype)
    
    const buttons = document.querySelectorAll('.category-container-desktop__button.activebtn')
        buttons.forEach(element => {
            element.classList.remove('activebtn')
    });

    const buttonsMobile = document.querySelectorAll('.category-container-mobile__button.activebtn')
        buttonsMobile.forEach(element => {
            element.classList.remove('activebtn')
    });

    }, [mediatype]);

    

//Cambiar el estado para recibir el value del boton al que se hizo click
    const changeCategory = (event) => {
        setCategory(event.target.value)
        //Resetear la paginacion a 1 al cambiar categoria
        setPage(1)

    //Cambiar background del boton al cambiar de categoria
        if(event.target.classList.contains('activebtn')) {
        event.target.classList.remove('activebtn')  
        }
    const buttons = document.querySelectorAll('.category-container-desktop__button.activebtn')
        buttons.forEach(element => {
            element.classList.remove('activebtn')
        });
    
    const buttonsMobile = document.querySelectorAll('.category-container-mobile__button.activebtn')
        buttonsMobile.forEach(element => {
            element.classList.remove('activebtn')
        });

    event.target.classList.toggle('activebtn')
  }


    return (
    <>
        <div className="category-container-desktop">
            <div className="category-container-desktop__buttons">
                {categoryMenu.map((element) => {
                    return <button className='category-container-desktop__button' value={element.valor} key={element.id} onClick={(e) => changeCategory(e)}>{element.nombre}</button>
                })}
            </div>
        </div>

        <div className='category-container-mobile'>
            <div className="category-container-mobile__dropdown">
                <h4>Categorias</h4>
                <button className='btn-category' onClick={() => handleClick()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg>
                </button>
            </div>
            <div className="category-container-mobile__buttons openbox">
                <ul>
                    {categoryMenu.map((element) => {
                    return <li key={element.id}><button className='category-container-desktop__button' value={element.valor} key={element.id} onClick={(e) => {changeCategory(e); handleClick()}}>{element.nombre}</button></li>
                    })}
                </ul>
            </div>
        </div>
    </>
    );
}
 
export default Filters;
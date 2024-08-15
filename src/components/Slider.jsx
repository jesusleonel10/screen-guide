import {useState, useEffect} from 'react';
import ItemSlider from './ItemSlider';
import Info from './Info';
import Modal from './Modal';
import Loading from './Loading';

import './../scss/Slider.scss'
const Slider = ({loading, trending, timeWindow, setTimeWindow}) => {
  // const {modal} = useContext(ContextQuery)
  const [modal, setModal] = useState(false);

  const [id, setId] = useState('');
  const [media, setMedia] = useState('');


  useEffect(() => {
    
    const btnTrending = () => {
      const btnDay = document.getElementById('day')
      const btnWeek = document.getElementById('week')

      if(timeWindow === 'day') {
        btnDay.classList.add('btn-trending-active')
      } else if (timeWindow === 'week') {
        btnWeek.classList.add('btn-trending-active')
      }

    }
    btnTrending()
}, [timeWindow])

  
  const activate = (e) => {
        const slider = document.querySelector('.slider-container__carousel');
        const items = document.querySelectorAll('.slider-container__item');
        e.target.matches('.next') && slider.append(items[0]);
        e.target.matches('.prev') && slider.prepend(items[items.length-1]);
  }

  const changeTrending = (e) => {
    
    setTimeWindow(e.target.value)

    if(e.target.classList.contains('btn-trending-active')) {
      e.target.classList.remove('btn-trending-active')  
    }
    const buttonsTrending = document.querySelectorAll('.btntrend.btn-trending-active')
    buttonsTrending.forEach(element => {
      element.classList.remove('btn-trending-active')
    });

    e.target.classList.toggle('btn-trending-active')

  }
    return (
  <>
    <div className='slider-container'>
      <div className='slider-container__title'>
        <h3>En Tendencia</h3>
          <button className='btntrend' id='day' value='day' onClick={(e) => changeTrending(e)}>Hoy</button>
          <button className='btntrend' id='week' value='week' onClick={(e) => changeTrending(e)}>Esta semana</button>
      </div>
      <ul className='slider-container__carousel'>
      {
        loading ?
        <Loading color={'#fff'} />
        :
         trending?.slice(0, 6)?.map((item) => {
          return <ItemSlider
             key={item.id}
             id={item.id}
             mediatype={item.media_type}
             title={item.title || item.name}
             overview={item.overview}
             poster={item.poster_path}
             backdrop={item.backdrop_path}
             setMedia={setMedia}
             setId={setId}
             setModal={setModal}
          />
         })      
        }
      </ul>
      <nav className='slider-container__nav'>
        <button className='btn prev' onClick={(e) => activate(e, false)} name="arrow-back-outline">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </button>
        <button className='btn next' onClick={(e) => activate(e, false)} name="arrow-forward-outline">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        </button>
      </nav>
  </div>
        {
          modal &&
          <Modal header='Información' setModal={setModal}>
              <Info 
                id={id}
                media={media}
                change={true}
              />
          </Modal>
        }
</>
    );
}
 
export default Slider;
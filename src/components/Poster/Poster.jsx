import './../scss/InfiniteScroll.scss'
import { Fade } from '@mui/material';

const Poster = ({poster}) => {
    return (
      <div className='item-scrolling-infinite-list'>
        <Fade in={true} timeout={500}>
          <img className='' alt="Poster de la pelicula o serie de tv" src={`https://image.tmdb.org/t/p/w500/${poster}`}></img>
        </Fade>
      </div>
    );
}
 
export default Poster;
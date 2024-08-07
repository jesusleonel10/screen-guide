import './../scss/InfiniteScroll.scss'

const Tag = ({poster}) => {
    return (
      <div className='item-scrolling-infinite-list'>
        <img className='' alt="Poster de la pelicula o serie de tv" src={`https://image.tmdb.org/t/p/w500/${poster}`}></img>
      </div>
    );
}
 
export default Tag;
import { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Slider from './components/Slider';
import List from './components/List'
import About from './components/About';
import { ContextQuery } from './context/contextQuery';
import { Routes, Route, useLocation } from 'react-router-dom';

import './scss/App.scss';
import Page404 from './components/Page404';


function App() {
  const [page404, setPage404] = useState(false);
  const {setMediaType} = useContext(ContextQuery)
  //Estado para obtener la ruta actual
  const location = useLocation()
  //Definir el filtro de la busqueda entre popular, mejores valorados etc...
  const [category, setCategory] = useState('popular');
  //Estado para la consulta de las peliculas y series en tendencia
  const [trending, setTrending] = useState([]);
  //Estado timewindows para hacer la consulta de tendencias entre dia y semana
  const [timeWindow, setTimeWindow] = useState('day');

  useEffect(() => {
    const loadTrending = async() => {
      const url = 'https://api.themoviedb.org/3/trending/all/'

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTQ5NDE0YTUyNmIyMzU0Mzk4OTczNWJhMjFhZTNkNSIsInN1YiI6IjY2NGI3Njg5MTMxY2Y2YzE2ODdjZTM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d2VJdOe_Mdkicyrlm_CGZREryZU8xC23wr0K_QAdIF8'
        }
      };

        try {
            const response = await fetch(`${url}${timeWindow}?&language=es-MX`, options)
            if(response.status === 200) {
                const data = await response.json()
                setTrending(data.results)
            } else if (response.status === 401){
                console.log('Llave incorrecta');
            } else if(response.status === 404){
                console.log('La consulta no existe');
            } else {
                console.log('Hubo un error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerRuta = () => {
      const { pathname } = location

      if(pathname === '/movies') {
        setMediaType('movie')
        setPage404(false)

      } else if(pathname === '/tv-shows'){
        setMediaType('tv')
        setPage404(false)

      } else if(pathname === '/'){
        setMediaType('')
        setPage404(false)

      } else if(pathname === '/acerca-de'){
        setMediaType('')
        setPage404(false)

      } else {
        setPage404(true)
      }
    }

    obtenerRuta()
    loadTrending()
  }, [location, setMediaType, setTrending, timeWindow]);

  return (
    <>
      <Header 
        setCategory={setCategory}
      />
      <Routes>
        <Route path='/' element={
          <main>
            <Search 
              trending={trending}
            />
            <Slider 
              trending={trending}
              timeWindow={timeWindow}
              setTimeWindow={setTimeWindow}
            />
          </main>
        } />
        <Route path='/movies' element={
          <List 
            category={category} 
            setCategory={setCategory}
            />} 
          />
        <Route path='/tv-shows' element={
          <List 
            category={category} 
            setCategory={setCategory}
          />} 
          />
        <Route path='/acerca-de' element={<About />} />
      </Routes>
        {
          page404 ? 
          <Page404 />
          : null
        }
    </>
  );
}

export default App;

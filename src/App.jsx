import { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Slider from './components/Slider';
import List from './components/List'
import About from './components/About';
import useFetchData from './hooks/useFetchData';
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

  //Estado timewindows para hacer la consulta de tendencias entre dia y semana
  const [timeWindow, setTimeWindow] = useState('day');

  const { data } = useFetchData(`https://api.themoviedb.org/3/trending/all/${timeWindow}?&language=es-MX`, timeWindow)

  
  useEffect(() => {
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
  }, [location, setMediaType, timeWindow]);

  return (
    <>
      <Header 
        setCategory={setCategory}
      />
      <Routes>
        <Route path='/' element={
          <main>
            <Search 
              trending={data.results}
            />
            <Slider 
              trending={data.results}
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

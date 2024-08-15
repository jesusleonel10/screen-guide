import Header from './components/Header';
import Main from './components/Main';
import About from './components/About';
// import { ContextQuery } from './context/contextQuery';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './scss/App.scss';
import Page404 from './components/Page404';
import CardList from './components/CardList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={
            <Main />
          } />
          <Route path='/movies' element={
            <CardList />} 
            />
          <Route path='/tv-shows' element={
            <CardList />} 
            />
          <Route path='/acerca-de' element={<About />} />
          <Route path='*' element={ <Page404 /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

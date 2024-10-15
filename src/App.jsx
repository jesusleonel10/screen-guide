import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import About from './components/About/About';
import CardList from './components/CardList/CardList';
import Page404 from './components/Page404/Page404';
import './App.scss';

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

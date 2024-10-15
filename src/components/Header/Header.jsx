import { NavLink } from 'react-router-dom';
import './Header.scss'

const Header = () => {

    const openMenuMobile = (idSidebar, idButton, option) => {
        const sidebar = document.querySelector(idSidebar);
        const button = document.querySelector(idButton);
        if(option) {
            sidebar.classList.toggle("sidebar--open");
            button.classList.toggle("open");
        } else {
            sidebar.classList.remove("sidebar--open");
            button.classList.remove("open");
        }
    }

    const handleClick = () => {
        openMenuMobile('#sidebar', '#button-menu', false)
    }

    return (
        <header className="header">
            <div className="logo-menu">
            <div className="logo">
                <h1>SCREEN GUIDE</h1>
            </div>
            
            <div id="button-menu" className="button-menu" onClick={() => openMenuMobile('#sidebar', '#button-menu', true)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div id="sidebar" className="sidebar">
                <ul>
                    <li><NavLink to="/" className="sidebar__items" onClick={() => handleClick()}>Inicio</NavLink></li>
                    <li><NavLink to="/movies" className="sidebar__items" data-link='movie' onClick={() => handleClick()}>Películas</NavLink></li>
                    <li><NavLink to="/tv-shows" className="sidebar__items" data-link='tv' onClick={() => handleClick()}>Series de TV</NavLink></li>
                    <li><NavLink to="/acerca-de" className="sidebar__items" onClick={() => handleClick()}>Acerca de</NavLink></li>
                </ul>
            </div>

            
            <nav className="menu">
                <NavLink to="/" 
                    className="menu__items"
                    onClick={(e) => {handleClick(e);}}>Inicio
                </NavLink>
                <NavLink to="/movies" 
                    className="menu__items" 
                    data-link='movie' 
                    onClick={(e) => {handleClick(e);}}>Películas
                </NavLink>
                
                <NavLink to="/tv-shows" 
                    className="menu__items" 
                    data-link='tv' 
                    onClick={(e) => {handleClick(e);}}>Series de TV
                </NavLink>
                <NavLink to="/acerca-de"
                    className="menu__items"
                    onClick={(e) => {handleClick(e);}}>Acerca de
                    
                </NavLink>


            </nav>
            </div>
        </header>
    );
}
 
export default Header;
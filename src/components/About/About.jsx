import imageWeb from './../images/undraw_web_development_0l6v.svg'
import logoTMDB from './../images/tmdb_logo.svg'
import logoJustWatch from './../images/justwatch_logo.png'
import './About.scss'

//Aqui va los creditos hacia los dueños de la API

const About = () => {
    return (
        <div className="about" >
            <h2 className="about__title">Sobre esta App web</h2>
            <div className="about__content">
                    <img src={logoTMDB} alt="Logo de TMDB" />
                    <p>Toda la información e imágenes relacionadas a las Películas, Series de TV y Personas usadas en esta aplicación son utilizadas de la API de <strong>TMDB</strong>, pero no está avalado ni certificado por <strong>TMDB</strong>.</p>
                    <a href="https://www.themoviedb.org/">https://www.themoviedb.org/</a>

                    <img src={logoJustWatch} alt="Logo de JustWatch" />
                    <p>Toda la información referente a las plataformas de compra, alquiler y streaming usadas en esta aplicación son pertenecientes a <strong>JustWatch</strong>.</p>
                    <a href="https://www.justwatch.com/">https://www.justwatch.com/</a>
            </div>
            <div className="about__img">
                <img src={imageWeb} alt="Ilustración sobre desarrollo web" />
            </div>
        </div>
    );
}
 
export default About;
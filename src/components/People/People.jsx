import { Fade } from "@mui/material";
import formatDate from "../../functions/formatDate";

const genders = [
    { id: 0,  valor: 'No Especifica'},
    { id: 1,  valor: 'Femenino'},                  
    { id: 2,  valor: 'Masculino'},          
    { id: 3,  valor: 'No Binario'}
]

const People = ({data}) => {
    return (
        <>
            <div className='poster'>
                <Fade in={true} timeout={500}>
                    <img src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`} alt="Foto de la persona" />
                </Fade>
                
            </div>
            <div className="details">
                <div className="title">
                    <h2>{data.name}</h2>
                    <div className='release'><h4>Fecha de Nacimiento:</h4><p>{formatDate(data.birthday)}</p></div>
                    {
                        data.deathday !== null ?
                            <div className='release'><h4>Fecha de Fallecimiento:</h4><p>{formatDate(data.deathday)}</p></div>
                        : null
                    }
                </div>
                <div className='overview'>
                    <h3>Biografia:</h3><p>{data.biography}</p>
                </div>
                <div className='genres'>
                    <h3>Genero:</h3> 
                        {
                            genders
                            .filter((gender) => gender.id === data.gender)
                            .map((item, index) => {
                                return <p className='genre' key={index}>{item.valor}</p>
                            })
                            
                        }
                </div>
                <div className="country">
                    <h3>Lugar de Nacimiento:</h3>
                     <p>{data.place_of_birth}</p>
                </div>
            </div>
        </>
    );
}
 
export default People;
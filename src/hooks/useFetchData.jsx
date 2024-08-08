import { useEffect, useState } from "react";
import showLoading from "../functions/showLoading";

const useFetchData = (url) => {
    //Definimos los estados para guardar los datos de la API, la flag para el loading y guardar el error en caso de que ocurra
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            //Paso la flag a true para iniciar la peticion a la api
            setLoading(true)
            const options = {
                method: 'GET',
                headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTQ5NDE0YTUyNmIyMzU0Mzk4OTczNWJhMjFhZTNkNSIsInN1YiI6IjY2NGI3Njg5MTMxY2Y2YzE2ODdjZTM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d2VJdOe_Mdkicyrlm_CGZREryZU8xC23wr0K_QAdIF8'
            }
        };
        try {
            //Hago la peticion pasandole la url que viene desde el componente
            const response = await fetch(url, options)
            if(response.status === 200) {
                //Si es exitosa actualizo el state con los datos
                const success = await response.json()
                setData(success)
            //En caso de algun error lo muestro en consola
            } else if (response.status === 401){
                console.log('API Key incorrect');
            } else if(response.status === 404){
                console.log('Pelicula o serie de tv no existe');
            } else {
                console.log('Hubo un error inesperado');
            }
        //Si es un error en la peticion lo capturo y lo guardo en el state
        } catch (error) {
            setError(error)
        //Paso la flag del loading a false por que se a terminado la peticion
        } finally {
            showLoading(800, setLoading, false)
        }
     };
     fetchData();
}, [url]);

    return { data, loading, error };
}

 
export default useFetchData;
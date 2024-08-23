import { useEffect, useState } from "react";
import axios from 'axios';

const useFetchData = (url, flag, flagDetails) => {
    //Definimos los estados para guardar los datos de la API, la flag para el loading y guardar el error en caso de que ocurra
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    /*
    La segunda flag primero la creo, luego al terminar la llamada de la api
    le paso el valor que recibi por props
    */
    const [changeFlag, setChangeFlag] = useState(null);

    useEffect(() => {
    //Al haber cambios en el url confirmamos que loading sea true para que luego pase a false, de lo contrario no habria animacion de carga 
    setLoading(true)
    //Uso flag para verificar primero que este definida para si hacer la llamada a la api, esto es mas que nada para cuando se recargue la pagina
    if(flag) {
        const api_token = import.meta.env.VITE_API_KEY
        const fetchData = async() => {
            
        try {
            //Hago la peticion pasandole la url que viene desde el componente
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${api_token}`
                  }
            })
            
            //Si es exitosa actualizo el state con los datos
            const success = response.data
            setData(success)
            //En caso de algun error lo muestro en consola
        
        //Si es un error en la peticion lo capturo y lo guardo en el state
        } catch (error) {
            setError(error)
            console.log(error);
        //Paso la flag del loading a false por que se a terminado la peticion
        } finally {
            //Usamos 300 como un tiempo minimo para mostrar la animacion, esto mas que nada cuando se hace una misma consulta dos veces
            setTimeout(() => {
                setLoading(false)
            }, 300);
            //Aqui le paso el valor que recibi por prop
            setChangeFlag(flagDetails)
        }
     };
     fetchData();
    }
}, [url, flag, flagDetails]);

    return { data, loading, error, changeFlag };
}

 
export default useFetchData;
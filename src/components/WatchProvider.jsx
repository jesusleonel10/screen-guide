import {useState, useEffect, Fragment} from 'react'
import Loading from './Loading';
import Provider from './Provider';
import showLoading from '../functions/showLoading';
import ScrollingWidget from './ScrollingWidget';
import './../scss/WatchProvider.scss'

const WatchProvider = ({idQuery, mediatype}) => {
    const [watchProvider, setWatchProvider] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [region, setRegion] = useState('');
    const [regionProvider, setRegionProvider] = useState({});


//LLamada a la API
  useEffect(() => {

    const loadWatchProvider = async() => {
      const url = `https://api.themoviedb.org/3/${mediatype}/`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTQ5NDE0YTUyNmIyMzU0Mzk4OTczNWJhMjFhZTNkNSIsInN1YiI6IjY2NGI3Njg5MTMxY2Y2YzE2ODdjZTM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d2VJdOe_Mdkicyrlm_CGZREryZU8xC23wr0K_QAdIF8'
        }
      };
        try {
            const response = await fetch(`${url}${idQuery}/watch/providers`, options)
            if(response.status === 200) {
                const data = await response.json()
                //Actualizamos el state con la respuesta del json
                setWatchProvider(data.results)
            } else if (response.status === 401){
                console.log('Llave incorrecta');
            } else if(response.status === 404){
                console.log('La pelicula o serie no existe');
            } else {
                console.log('Hubo un error');
            }
        } catch (error) {
            console.log(error);
        }
        showLoading(900, setLoadingDetails)
        
    }
    
    const selectCountry = (obj) => {
        if(Object.keys(obj).some((item) => item === 'VE')){
            setRegion('VE'.toLowerCase())
            setRegionProvider(obj.VE)
        } else if(Object.keys(obj).some((item) => item === 'US')){
            setRegion('US'.toLowerCase())
            setRegionProvider(obj.US)
        } else {
            setRegion('No disponible en VE ni US')
            setRegionProvider(null)
        }
    }
    
    loadWatchProvider()
    selectCountry(watchProvider)
}, [idQuery, mediatype, region, watchProvider])
    return (
        <>
        <div className="watch_provider">
            {   
                //Muestro animacion de carga mientras sea true
                 loadingDetails ?
                 <div className='loading_provider'>
                     <Loading />
                 </div>
                //Al ser false, termina la carga
                 :
                //Confirmo si regionProvider tiene los datos o esta vacio
                 regionProvider ?
                //Si tiene los datos muestro el componente ahora si
                 <Fragment>
                 {regionProvider.flatrate ?

                    <ScrollingWidget
                        showHeader={true}
                        textHeader='Disponible para Streaming'
                        region={region}
                        flag={true}
                        idWidget='provider-streaming'
                        >
                        {regionProvider.flatrate?.map((item, index) => {
                                 return <Provider 
                                 key={index}
                                 logo={item.logo_path}
                                 classname={'item-scrolling'}
                             />
                        })}
                    </ScrollingWidget>
                    : null}
                {regionProvider.rent ? 

                <ScrollingWidget
                    showHeader={true}
                    textHeader='Disponible para Alquilar'
                    region={region}
                    flag={true}
                    idWidget='provider-rent'

                >
                        {regionProvider.rent?.map((item, index) => {
                                 return <Provider 
                                 key={index}
                                 logo={item.logo_path}
                                 classname={'item-scrolling'}
                             />
                        })}
                    </ScrollingWidget>
                : null}
                {regionProvider.buy ? 
                
                <ScrollingWidget
                    showHeader={true}
                    textHeader='Disponible para Comprar'
                    region={region}
                    flag={true}
                    idWidget='provider-buy'

                >
                        {regionProvider.buy?.map((item, index) => {
                                 return <Provider 
                                 key={index}
                                 logo={item.logo_path}
                                 classname={'item-scrolling'}
                             />
                        })}
                    </ScrollingWidget>
                : null}
                </Fragment>
            //Si no tenia los datos del proovedor entonces solamente muestra la card sin mas    
            : 
            <ScrollingWidget
                    showHeader={true}
                    textHeader='No disponible'
                    region={region}
                    showBackground={true}
                    flag={true}
                    idWidget='provider-null'
                >
                    <Provider />
            </ScrollingWidget>
            
            }
        </div>        
        </>
    );
}
 
export default WatchProvider;

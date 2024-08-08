import {useState, useEffect, Fragment} from 'react'
import Loading from './Loading';
import Provider from './Provider';
import ScrollingWidget from './ScrollingWidget';
import useFetchData from '../hooks/useFetchData';

import './../scss/WatchProvider.scss'

const WatchProvider = ({idQuery, mediatype}) => {
    const [region, setRegion] = useState('');
    const [regionProvider, setRegionProvider] = useState({});

    const { data, loading } = useFetchData(`https://api.themoviedb.org/3/${mediatype}/${idQuery}/watch/providers`, mediatype)


  useEffect(() => {
    //Tras obtener lo datos de la api selecciono nada mas los resultados que tenga la region VE o US
    const selectCountry = (obj) => {
        
        if(obj && Object.keys(obj).some((item) => item === 'VE')){
            setRegion('VE'.toLowerCase())
            setRegionProvider(obj.VE)
        } else if(obj && Object.keys(obj).some((item) => item === 'US')){
            setRegion('US'.toLowerCase())
            setRegionProvider(obj.US)
        } else {
            setRegion('No disponible en VE ni US')
            setRegionProvider(null)
        }

    }
    
    selectCountry(data.results)
}, [region, data])

    return (
        <>
        <div className="watch_provider">
            {   
                //Muestro animacion de carga mientras sea true
                 loading ?
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

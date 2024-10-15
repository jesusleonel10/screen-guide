import { useState } from 'react'
import Details from '../Details/Details'
import WatchProvider from '../WatchProvider/WatchProvider'
import Credits from '../Credits/Credits'
import Filmography from '../Filmography/Filmography'

const Info = ({id, media, type}) => {

    const [idDetails, setIdDetails] = useState(id);
    const [mediaDetails, setMediaDetails] = useState(media);
    const [typeDetails, setTypeDetails] = useState(type);

    return  (  
        <>
            <div className='container-modal__content'>
                    <Details 
                        idDetails={idDetails}
                        mediaDetails={mediaDetails}
                        typeDetails={typeDetails}
                    />
                        {
                        typeDetails === 'movie' || typeDetails === 'tv' ?
                        <div className='widgets'>
                            <Credits 
                                idQuery={idDetails}
                                mediatype={mediaDetails}
                                setIdDetails={setIdDetails}
                                setTypeDetails={setTypeDetails}
                            />
                            <WatchProvider 
                                idQuery={idDetails}
                                mediatype={mediaDetails}
                            />
                        </div>
                        //En caso de ser typeDetails igual a person
                        : 
                        <Filmography
                            idDetails={idDetails}
                            mediaDetails={mediaDetails} 
                            setTypeDetails={setTypeDetails}
                            setIdDetails={setIdDetails}
                            setMediaDetails={setMediaDetails}
                        />
                        }  
            </div>
        </>
    );
}
 
export default Info;
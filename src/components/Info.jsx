import { useState } from 'react'
import Details from './Details'
import WatchProvider from './WatchProvider'
import Credits from './Credits'
import Filmography from './Filmography'

const Info = ({id, media, change}) => {

    const [idDetails, setIdDetails] = useState(id);
    const [mediaDetails, setMediaDetails] = useState(media);
    const [changeDetails, setChangeDetails] = useState(change);
    
    console.log(idDetails);

    return  (  
        <>
            <div className='container-modal__content'>
                    <Details 
                        idDetails={idDetails}
                        mediaDetails={mediaDetails}
                        changeDetails={changeDetails}
                    />
                    {
                        changeDetails ?
                        <div className='widgets'>
                            <Credits 
                                idQuery={idDetails}
                                mediatype={mediaDetails}
                                setChangeDetails={setChangeDetails}
                                setIdDetails={setIdDetails}
                            />
                            <WatchProvider 
                                idQuery={idDetails}
                                mediatype={mediaDetails}
                            />
                        </div>
                        : null
                    }
                    {
                        !changeDetails ?
                        <Filmography
                            idDetails={idDetails}
                            mediaDetails={mediaDetails} 
                            setChangeDetails={setChangeDetails}
                            setIdDetails={setIdDetails}
                            setMediaDetails={setMediaDetails}
                        /> : null
                    }
            </div>
        </>
    );
}
 
export default Info;
import {useState, useEffect, Fragment} from 'react'
import Loading from './Loading';
import showLoading from '../functions/showLoading';
import ScrollingWidget from './ScrollingWidget';
import Profile from './Profile';
import './../scss/Credits.scss'

const Credits = ({idQuery, mediatype}) => {
    const [credits, setCredits] = useState([]);
    const [loadingCredits, setloadingCredits] = useState(true);

    useEffect(() => {
        const loadCredits = async() => {
            const url = `https://api.themoviedb.org/3/${mediatype}/`
            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTQ5NDE0YTUyNmIyMzU0Mzk4OTczNWJhMjFhZTNkNSIsInN1YiI6IjY2NGI3Njg5MTMxY2Y2YzE2ODdjZTM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d2VJdOe_Mdkicyrlm_CGZREryZU8xC23wr0K_QAdIF8'
              }
            };
              try {
                  const response = await fetch(`${url}${idQuery}/${mediatype === 'tv' ? 'aggregate_credits' : 'credits'}?language=es-MX`, options)
                  if(response.status === 200) {
                      const data = await response.json()
                      //Actualizamos el state con la respuesta del json
                      setCredits(data)
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
              showLoading(900, setloadingCredits, false)    
          }

    loadCredits()
    }, [idQuery, mediatype]);

    return (
        <>
            <div className="credits">
                {
                //Muestro animacion de carga mientras sea true
                loadingCredits ?
                    <Loading />
                //Al pasar a false termina la carga y mostramos el componente
                    :
                    <Fragment>
                        <ScrollingWidget
                            showHeader={true}
                            textHeader='Reparto'
                            idWidget='cast'
                        >
                        {
                            mediatype === 'movie' ?
                            credits.cast.slice(0, 12)?.map((item, index) => {
                                return <Profile
                                    key={index}
                                    photo={item.profile_path}
                                    name={item.name}
                                    character={item.character}
                                />
                            })
                            :
                            credits.cast.slice(0, 12)?.map((item, index) => {
                                return <Profile
                                    key={index}
                                    photo={item.profile_path}
                                    name={item.name}
                                    character={item.roles.map((c) => c.character)}
                                />
                            })
                        }
                        </ScrollingWidget>
                        <ScrollingWidget
                            showHeader={true}
                            textHeader='Directores y Escritores'
                            idWidget='director-writers'
                        >
                        {
                            mediatype === 'tv' ?
                            credits.crew.filter((item) => item.jobs.some((element) => element.job === 'Director' || element.job === 'Writer'))
                            .slice(0, 12)
                            .map((item, index) => {
                                return <Profile
                                    key={index}
                                    photo={item.profile_path}
                                    name={item.name}
                                    job={item.jobs.map((i) => i.job)}
                                />
                            })
                            :
                            credits.crew.filter((item) => item.job === 'Director' || item.job === 'Writer')
                            .slice(0, 12)
                            .map((item, index) => {
                                return <Profile
                                    key={index}
                                    photo={item.profile_path}
                                    name={item.name}
                                    job={item.job}
                                />
                            })
                        }
                        </ScrollingWidget>
                    </Fragment>
                }
            </div>
        </>
    );
}
 
export default Credits;
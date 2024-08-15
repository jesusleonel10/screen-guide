import './../scss/Profile.scss'

const Profile = ({id, photo, name, character, job, setChangeDetails, setIdDetails}) => {

    const handleClick = () => {
        setChangeDetails(false)
        setIdDetails(id)
    }

    return (
        <div className="card_profile" onClick={handleClick}>
            <div className="card_profile__photo">
                {
                    photo ?
                    <img src={`https://image.tmdb.org/t/p/original${photo}`} alt="Foto" />
                    : null
                }
            </div>
            <div className="card_profile__details">
                <h3>{name}</h3>
                <h4>{character || job}</h4>
            </div>
        </div>
    );
}
 
export default Profile;
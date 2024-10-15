const Votes = (props) => {
  const { valor, cantidad, coloremoji } = props;
  const porcentaje = valor * 100 / 10; // Convertir valor a porcentaje

  return (
    <>
        <div className="emoji_number">
            {
                porcentaje < 30 ? 
                <i className="fa-solid fa-face-angry" style={ coloremoji ? {color: coloremoji} : {color: '#FFA98D'}}></i>
                :
                porcentaje < 50 ?
                <i className="fa-solid fa-face-frown" style={coloremoji ? {color: coloremoji} : {color: '#FFC385'}}></i>
                :
                porcentaje < 60 ?
                <i className="fa-solid fa-face-meh" style={coloremoji ? {color: coloremoji} : {color: '#FFD885'}}></i>
                :
                porcentaje < 70 ?
                <i className="fa-solid fa-face-smile" style={coloremoji ? {color: coloremoji} : {color: '#FFD885'}}></i>
                :
                porcentaje < 80 ?
                <i className="fa-solid fa-face-laugh-beam" style={coloremoji ? {color: coloremoji} : {color: '#FFD885'}}></i>
                : 
                porcentaje < 100 ?
                <i className="fa-solid fa-face-grin-stars" style={coloremoji ? {color: coloremoji} : {color: '#FFD885'}}></i>
                : null
            }
        
        <span>{`${Math.floor(porcentaje)}%`}</span>
        </div>
        <span>Votos: {cantidad}</span>
    </>
  );
}

export default Votes;

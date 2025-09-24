//frontend/src/components/player/Bullets.jsx

/*
  * Renderiza todas las balas disparadas por el jugador.
  * Cada bala se posiciona según sus coordenadas y se dibuja con el sprite correspondiente.
*/
function Bullets({ bullets, bulletSprite }) {
    return (
      <>
        {bullets.map((b, i) => (
          <img
            key={i}
            src={bulletSprite}
            alt="bullet"
            className="bullet"
            style={{ left: `${b.x}px`, top: `${b.y}px` }}
          />
        ))}
      </>
    );
  }
  
  export default Bullets;
  
// frontend/src/components/player/SmokeTrail.jsx

/*
  * Renderiza la estela de humo detrás del avión del jugador.
  * Cada partícula tiene posición y opacidad variable para simular movimiento.
*/
function SmokeTrail({ smokeTrail, smoke }) {
    return (
      <>
        {smokeTrail.map((s, i) => (
          <img
            key={i}
            src={smoke}
            alt="smoke"
            className="smoke"
            style={{
              left: `${s.x}px`,
              top: `${s.y}px`,
              opacity: s.opacity,
            }}
          />
        ))}
      </>
    );
  }
  
  export default SmokeTrail;
  
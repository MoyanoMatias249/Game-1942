//frontend/src/components/Explosions.jsx

/*
  * Renderiza las explosiones en pantalla cuando un enemigo o el jugador recibe daño.
  * Cada explosión usa un frame animado y se posiciona según su coordenada.
*/
function Explosions({ explosions, explosionFrames }) {
  return (
    <>
      {explosions.map((e, i) => (
        <img
          key={i}
          src={explosionFrames[e.frame]}
          alt="explosion"
          className="explosion"
          style={{ left: `${e.x}px`, top: `${e.y}px` }}
        />
      ))}
    </>
  );
}

export default Explosions;

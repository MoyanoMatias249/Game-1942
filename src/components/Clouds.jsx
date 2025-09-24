//frontend/src/components/Clouds.jsx

/*
  * Renderiza las nubes en pantalla como elementos decorativos en movimiento.
  * Cada nube tiene posición y sprite individual.
*/
function Clouds({ clouds }) {
  return (
    <>
      {clouds.map((c, i) => (
        <img
          key={i}
          src={c.sprite}
          alt="cloud"
          className="cloud"
          style={{ left: `${c.x}px`, top: `${c.y}px` }}
        />
      ))}
    </>
  );
}

export default Clouds;

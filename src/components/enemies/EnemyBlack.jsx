// frontend/src/components/enemies/EnemyBlack.jsx
import propeller_1 from "../../assets/propeller1.png";
import propeller_2 from "../../assets/propeller2.png";
import blackSprite from "../../assets/enemy-boss.png";
import shadow from "../../assets/enemy-shadow.png";
/*
  * Renderiza al enemigo jefe con sprite grande, sombra y hélice animada.
  * Usa rotación para efectos visuales y posicionamiento absoluto.
*/
function EnemyBlack({ x, y, rotation = 0, propellerFrame }) {
  const width = 200;
  const height = 200;

  return (
    <div
      className="enemy-wrapper"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 5,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center'
      }}
    >
      {/* Sombra */}
      <img
        src={shadow}
        alt="enemy-shadow"
        style={{
          position: 'absolute',
          left: 40,
          top: 40,
          width: `${width}px`,
          height: `${height}px`,
          opacity: 0.3,
          zIndex: 1
        }}
      />
      {/* Cuerpo */}
      <img
        src={blackSprite}
        alt="enemy-boss"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${width}px`,
          height: `${height}px`,
          zIndex: 2
        }}
      />
      {/* Hélice */}
      <img
        src={propellerFrame === 0 ? propeller_1 : propeller_2}
        alt="enemy-propeller"
        style={{
          position: 'absolute',
          left: width / 2 - 30,
          top: height - 30,
          width: '60px',
          height: '40px',
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default EnemyBlack;
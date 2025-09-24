// frontend/src/components/enemies/EnemyBlue.jsx
import propeller_1 from "../../assets/propeller1.png";
import propeller_2 from "../../assets/propeller2.png";
import blueSprite from "../../assets/enemy2.png";
import shadow from "../../assets/enemy-shadow.png";

/*
  * Renderiza el enemigo azul con sombra, sprite y hélice animada.
  * Usa rotación para efectos visuales y posicionamiento absoluto.
*/
function EnemyBlue({ x, y, propellerFrame, rotation = 90 }) {
  const size = 50;

  return (
    <div
      className="enemy-wrapper"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: `${size}px`,
        height: `${size}px`,
        zIndex: 5,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center'
      }}
    >
      <img
        src={shadow}
        alt="enemy-shadow"
        style={{
          position: 'absolute',
          left: 15,
          top: 15,
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.3,
          zIndex: 1
        }}
      />
      <img
        src={blueSprite}
        alt="enemy"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${size}px`,
          height: `${size}px`,
          zIndex: 2
        }}
      />
      <img
        src={propellerFrame === 0 ? propeller_1 : propeller_2}
        alt="enemy-propeller"
        style={{
          position: 'absolute',
          left: size / 2 - 6,
          top: size - 4,
          width: '12px',
          height: '12px',
          zIndex: 3,
          animation: 'spin 0.2s linear infinite'
        }}
      />
    </div>
  );
}

export default EnemyBlue;

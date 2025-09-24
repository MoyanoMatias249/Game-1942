// frontend/src/components/enemies/EnemyBrown.jsx
import propeller_1 from "../../assets/propeller1.png";
import propeller_2 from "../../assets/propeller2.png";
import brownSprite from "../../assets/enemy3.png";
import shadow from "../../assets/enemy-shadow.png";

/*
  * Renderiza el enemigo marron con sombra, sprite y hélice animada.
  * Usa rotación para efectos visuales y posicionamiento absoluto.
*/
function EnemyBrown({ x, y, propellerFrame, rotation = 0 }) {
  const width = 50; // mismo tamaño que el jugador
  const height = 50;

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
            transform: `rotate(${rotation || 0}deg)`,
            transformOrigin: 'center center'
        }}
        >
        {/* Sombra */}
        <img
            src={shadow}
            alt="enemy-shadow"
            className="enemy-shadow"
            style={{
            position: 'absolute',
            left: 15,
            top: 15,
            width: '50px',
            height: '50px',
            opacity: 0.3,
            zIndex: 1
            }}
        />

        {/* Cuerpo */}
        <img
            src={brownSprite}
            alt="enemy"
            className="enemy-plane"
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
            className="enemy-propeller"
            style={{
                position: 'absolute',
                left: width / 2 - 6,
                top: height - 4,
                width: '12px',
                height: '12px',
                zIndex: 3,
                animation: 'spin 0.2s linear infinite'
            }}
        />
    </div>
  );
}

export default EnemyBrown;

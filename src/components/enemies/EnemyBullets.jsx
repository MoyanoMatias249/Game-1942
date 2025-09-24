//frontend/src/components/enemies/EnemyBullets.jsx

/*
  * Renderiza todas las balas disparadas por enemigos.
  * Cada bala se posiciona según sus coordenadas y se dibuja con sprite.
*/
function EnemyBullets({ bullets, bulletSprite }) {
  return (
    <>
      {bullets.map((b, i) => (
        <img
          key={i}
          src={bulletSprite}
          alt="enemy-bullet"
          className="enemy-bullet"
          style={{
            position: 'absolute',
            left: `${b.x}px`,
            top: `${b.y}px`,
            width: '8px',
            height: '16px',
            zIndex: 4
          }}
        />
      ))}
    </>
  );
}

export default EnemyBullets;

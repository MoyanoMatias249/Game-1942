//frontend/src/components/enemies/Enemies.jsx
import RedEnemy from './EnemyRed';
import EnemyBlue from './EnemyBlue';
import EnemyBrown from './EnemyBrown';
import EnemyPurple from './EnemyPurple.jsx';
import EnemyBlack from './EnemyBlack';

/*
 * Renderiza todos los enemigos activos en pantalla según su tipo.
 * Cada enemigo se dibuja con su sprite, posición, rotación y hélice animada.
*/
function Enemies({ enemies, enemyPropellerFrame }) {
  return (
    <>
      {enemies.map((enemy, index) => {
        if (enemy.type === 'red') {
          return (
            <RedEnemy
              key={index}
              x={enemy.x}
              y={enemy.y}
              propellerFrame={enemyPropellerFrame}
              rotation={enemy.rotation}
            />
          );
        }
        if (enemy.type === 'blue') {
          return (
            <EnemyBlue
              key={index}
              x={enemy.x}
              y={enemy.y}
              propellerFrame={enemyPropellerFrame}
              rotation={enemy.rotation}
            />
          );
        }
        if (enemy.type === 'brown') {
          return (
            <EnemyBrown
              key={index}
              x={enemy.x}
              y={enemy.y}
              rotation={enemy.rotation}
              propellerFrame={enemyPropellerFrame}
            />
          );
        }
        if (enemy.type === 'purple') {
          return (
            <EnemyPurple
              key={index}
              x={enemy.x}
              y={enemy.y}
              rotation={enemy.rotation}
              propellerFrame={enemyPropellerFrame}
            />
          );
        }
        if (enemy.type === 'black') {
          return (
            <EnemyBlack
              key={index}
              x={enemy.x}
              y={enemy.y}
              rotation={enemy.rotation}
              propellerFrame={enemyPropellerFrame}
            />
          );
        }
        return null;
      })}
      
    </>
  );
}


export default Enemies;
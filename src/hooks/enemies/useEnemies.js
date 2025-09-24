//frontend/src/hooks/enemies/useEnemies.js
import { useEffect, useState } from 'react';
import { createRedEnemy, updateRedEnemy } from './useEnemiesRed.js';
import { createBlueEnemy, updateBlueEnemy } from './useEnemiesBlue.js';
import { createBrownEnemy, updateBrownEnemy } from './useEnemiesBrown.js';
import { createPurpleEnemy, updatePurpleEnemy } from './useEnemiesPurple.js';
import { createBlackBoss, updateBlackBoss } from './useEnemiesBlack.js';

/*
  * Maneja el estado y movimiento de todos los enemigos activos.
  * Actualiza su posición en cada frame y permite generar nuevos enemigos por tipo.
*/
function useEnemies(isGameStarted, isPaused) {
  const [enemies, setEnemies] = useState([]);
  const [enemyPropellerFrame, setEnemyPropellerFrame] = useState(0);

  // Mapa que asocia cada tipo de enemigo con su función de actualización
  const updaterMap = {
    red: updateRedEnemy,
    blue: updateBlueEnemy,
    brown: updateBrownEnemy,
    purple: updatePurpleEnemy,
    black: updateBlackBoss
  };
  
  /*
    * Actualiza la posición y estado de cada enemigo en cada frame.
    * Elimina al jefe si entra en fase de retirada y sale de pantalla.
  */
  useEffect(() => {
    if (!isGameStarted || isPaused) return;
    let animationId;

    const animate = () => {
      setEnemies((prev) =>
        prev
          .map((e) => {
            const updater = updaterMap[e.type];
            return updater ? updater(e) : null;
          })
          .filter((e) => {
            if (!e) return false;
            if (e.type === 'black' && e.phase === 'retreating' && e.y < -300) return false; // se fue volando
            return true;
          })
      );
      animationId = requestAnimationFrame(animate);
    };


    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isGameStarted, isPaused]);

   /*
    * Genera enemigos nuevos del tipo indicado.
    * Se usa en los eventos de nivel para poblar la pantalla.
  */
  const spawnEnemies = (type, count) => {
    const newEnemies = [];
    for (let i = 0; i < count; i++) {
      if (type === 'red') newEnemies.push(createRedEnemy());
      if (type === 'blue') newEnemies.push(createBlueEnemy());
      if (type === 'brown') newEnemies.push(createBrownEnemy());
      if (type === 'purple') newEnemies.push(createPurpleEnemy());
      if (type === 'black') newEnemies.push(createBlackBoss());
    }
    setEnemies((prev) => [...prev, ...newEnemies]);
  };

  // Alterna el frame de hélice para animación visual.
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemyPropellerFrame((prev) => (prev + 1) % 2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return [enemies, setEnemies, spawnEnemies, enemyPropellerFrame];
}

export default useEnemies;

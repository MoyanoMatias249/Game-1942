//frontend/src/hooks/useLevelManager.js

/*
  * Hook que gestiona el avance de niveles y el tiempo transcurrido.
  * Dispara eventos de enemigos en momentos específicos definidos en levels.js.
*/
import { useState, useEffect } from 'react';
import levels from '../config/levels';

function useLevelManager(isGameStarted, isPaused, spawnEnemies) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const level = levels[currentLevelIndex];

  /*
    * Cuenta el tiempo transcurrido desde que comenzó el nivel.
    * Se actualiza cada segundo si el juego está activo.
  */
  useEffect(() => {
    if (!isGameStarted || isPaused) return;

    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameStarted, isPaused]);


  /*
    * Revisa si hay eventos programados para el tiempo actual.
    * Si los hay, genera los enemigos correspondientes.
  */
  useEffect(() => {
    if (!isGameStarted || isPaused) return;

    level.events.forEach((event) => {
      if (event.time === elapsed) {
        event.enemies.forEach(({ type, count }) => {
          spawnEnemies(type, count);
        });
      }
    });
  }, [elapsed, isGameStarted, isPaused, currentLevelIndex]);

  /*
    * Avanza al siguiente nivel y reinicia el tiempo.
    * Si ya está en el último nivel, se queda ahí.
  */
  const advanceLevel = () => {
    setCurrentLevelIndex((prev) => Math.min(prev + 1, levels.length - 1));
    setElapsed(0);
  };

  /*
    * Reinicia el juego desde el primer nivel.
  */
  const resetLevel = () => {
    setCurrentLevelIndex(0);
    setElapsed(0);
  };

  return { level, elapsed, advanceLevel, resetLevel };
}

export default useLevelManager;

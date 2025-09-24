//frontend/src/hooks/player/usePlayerCollision.js
import { useEffect, useRef } from 'react';

/*
  * Hook que detecta colisiones entre el avión del jugador y enemigos o balas enemigas.
  * Si hay impacto, se dispara daño al jugador.
*/
function usePlayerCollision(enemies, enemyBullets, planeRef, triggerDamage, isGameStarted, isPaused) {
  const animationRef = useRef();

  useEffect(() => {
    if (!isGameStarted || isPaused) return;
      
    const checkCollision = () => {
      const plane = planeRef.current;
      if (!plane) return;

      // Centro aproximado del avión
      const px = parseInt(plane.style.left || '200') + 12.5;
      const py = parseInt(plane.style.top || '400') + 10;

       // Colisión con enemigos (cercanía < 25px)
      enemies.forEach((e) => {
        const dx = px - e.x;
        const dy = py - e.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 25) {
          triggerDamage();
        }
      });

      // Colisión con balas enemigas (cercanía < 15px)
      enemyBullets.forEach((b) => {
        const dx = px - b.x;
        const dy = py - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 15) {
          triggerDamage();
        }
      });

      animationRef.current = requestAnimationFrame(checkCollision);
    };

    animationRef.current = requestAnimationFrame(checkCollision);
    return () => cancelAnimationFrame(animationRef.current);
  }, [enemies, enemyBullets, isGameStarted, isPaused]);
}


export default usePlayerCollision;

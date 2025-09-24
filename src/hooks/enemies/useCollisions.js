//frontend/src/hooks/enemies/useCollisions.jsx
import { useEffect, useRef } from 'react';

/*
  * Detecta colisiones entre balas del jugador y enemigos.
  * Si una bala impacta, se dispara una explosión, se reduce la vida del enemigo
  * y si muere, se elimina y se suma el puntaje correspondiente.
*/
function useCollisions(bullets, enemies, setBullets, setEnemies, triggerExplosion, setScore, isPaused) {
  const animationRef = useRef();

  useEffect(() => {
    if (isPaused) return;
    const checkCollisions = () => {
      const collidedBullets = new Set(); // índices de balas que impactaron
      const collidedEnemies = new Set(); // índices de enemigos que murieron
      let updatedScore = 0;
      
      // Recorre todas las balas y enemigos para detectar colisiones     
      bullets.forEach((b, bi) => {
        enemies.forEach((e, ei) => {
          const hitboxSize = e.type === 'black' ? 100 : e.type === 'purple' ? 40 : 25;
          const dx = b.x - (e.x + hitboxSize);
          const dy = b.y - (e.y + hitboxSize);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < hitboxSize) {
            triggerExplosion(e.x + hitboxSize, e.y + hitboxSize);
            collidedBullets.add(bi);
            e.health -= 1;

            if (e.health <= 0) {
              collidedEnemies.add(ei);
              updatedScore += e.points;
            }
          }
        });
      });

      // Elimina balas y enemigos que colisionaron
      if (collidedBullets.size > 0 || collidedEnemies.size > 0) {
        setBullets((prev) => prev.filter((_, i) => !collidedBullets.has(i)));
        setEnemies((prev) => prev.filter((_, i) => !collidedEnemies.has(i)));
        setScore((prev) => prev + updatedScore);
      }

      animationRef.current = requestAnimationFrame(checkCollisions);
    };

    animationRef.current = requestAnimationFrame(checkCollisions);
    return () => cancelAnimationFrame(animationRef.current);
  }, [bullets, enemies]);
}

export default useCollisions;

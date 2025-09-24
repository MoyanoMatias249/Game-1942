//frontend/src/hooks/player/useBullets.jsx
import { useEffect, useState } from 'react';

/*
  * Hook que gestiona el disparo doble desde el avión y el movimiento vertical de las balas.
  * Dispara una vez al presionar espacio, y luego cada 150ms si se mantiene presionado.
*/
function useBullets(keys, planeRef) {
  const [bullets, setBullets] = useState([]);
  const [isHolding, setIsHolding] = useState(false);

  // Detecta la pulsación inicial de la tecla espacio
  useEffect(() => {
    if (keys.Space && !isHolding) {
      setIsHolding(true);
      shootBullets();
    } else if (!keys.Space && isHolding) {
      setIsHolding(false);
    }
  }, [keys.Space]);

  // Disparo continuo mientras se mantiene presionado
  useEffect(() => {
    if (!isHolding) return;

    const interval = setInterval(() => {
      shootBullets();
    }, 150);

    return () => clearInterval(interval);
  }, [isHolding]);

  /*
    * Dispara dos balas desde el avión: una desde la izquierda y otra desde la derecha.
    * Calcula la posición actual del avión para ubicar las balas correctamente.
  */
  const shootBullets = () => {
    const plane = planeRef.current;
    if (!plane) return;

    const left = parseInt(plane.style.left || '200');
    const top = parseInt(plane.style.top || '400');

    const leftBullet = { x: left + 16, y: top - 8 };
    const rightBullet = { x: left + 39, y: top - 8 };

    setBullets((prev) => [...prev, leftBullet, rightBullet]);
  };

  // Mueve las balas hacia arriba y elimina las que salen de pantalla
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 10 }))
          .filter((b) => b.y > -20)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return [bullets, setBullets];
}

export default useBullets;

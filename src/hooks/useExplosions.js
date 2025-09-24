//frontend/src/hooks/useExplosions.jsx
import { useEffect, useState } from 'react';
import explosion1 from '../assets/explosion1.png';
import explosion2 from '../assets/explosion2.png';
import explosion3 from '../assets/explosion3.png';
import explosion4 from '../assets/explosion4.png';

const explosionFrames = [explosion1, explosion2, explosion3, explosion4];

/*
  * Hook que gestiona las explosiones en pantalla.
  * Cada explosión avanza por sus frames y se elimina al terminar la animación.
*/
function useExplosions() {
  const [explosions, setExplosions] = useState([]);

  /*
    * Agrega una nueva explosión en la posición dada.
    * Comienza en el frame 0.
  */
  const triggerExplosion = (x, y) => {
    setExplosions((prev) => [...prev, { x, y, frame: 0 }]);
  };

  /*
    * Avanza el frame de cada explosión cada 100ms.
    * Elimina las que ya completaron todos los frames.
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setExplosions((prev) =>
        prev
          .map((e) => ({ ...e, frame: e.frame + 1 }))
          .filter((e) => e.frame < explosionFrames.length)
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return { explosions, triggerExplosion, explosionFrames };
}

export default useExplosions;

//frontend/src/hooks/player/useSmokeTrail.jsx
import { useEffect, useState } from 'react';

/*
  * Hook que genera una estela de humo detrás del avión.
  * Crea partículas cada 100ms y las desvanece gradualmente.
*/
function useSmokeTrail(planeRef) {
  const [smokeTrail, setSmokeTrail] = useState([]);

  // Crea nuevas partículas de humo en la posición del avión
  useEffect(() => {
    const interval = setInterval(() => {
      const plane = planeRef.current;
      if (!plane) return;
      const left = parseInt(plane.style.left || '200');
      const top = parseInt(plane.style.top || '400');
      setSmokeTrail((prev) => [...prev, { x: left + 25, y: top + 50, opacity: 1 }]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Mueve las partículas hacia abajo y reduce su opacidad
  useEffect(() => {
    const interval = setInterval(() => {
      setSmokeTrail((prev) =>
        prev
          .map((s) => ({ ...s, y: s.y + 1, opacity: s.opacity - 0.02 }))
          .filter((s) => s.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return smokeTrail;
}

export default useSmokeTrail;

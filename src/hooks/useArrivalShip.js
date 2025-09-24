//frontend/src/hooks/useArrivalShip.js
import { useState, useEffect } from 'react';

/*
  * Hook que gestiona la aparición del barco de llegada al final del nivel.
  * Se vuelve visible 3 segundos después de que termina el nivel y baja hasta y = 400.
*/
function useArrivalShip(elapsed, duration) {
  const [y, setY] = useState(-100);
  const [visible, setVisible] = useState(false);

  // Reinicia el barco al comenzar el nivel
  useEffect(() => {
    if (elapsed === 0) {
      setY(-100);
      setVisible(false);
    }
  }, [elapsed]);

  // Activa visibilidad 3 segundos después de que termina el nivel
  useEffect(() => {
  if (elapsed >= duration + 3000) {
      setVisible(true);
    }
  }, [elapsed, duration]);

  // Baja el barco hasta y = 400
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setY((prev) => Math.min(prev + 2, 400));
    }, 16);
    return () => clearInterval(interval);
  }, [visible]);
  
  return { y, visible };
}

export default useArrivalShip;

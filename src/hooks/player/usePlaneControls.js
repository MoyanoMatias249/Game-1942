//frontend/src/hooks/player/usePlaneControls.jsx
import { useEffect, useState } from 'react';

/*
  * Hook que gestiona el movimiento del avión, el cambio de sprite según dirección
  * y la animación de la hélice.
*/
function usePlaneControls(planeRef, shadowRef, propellerRef, planeNeutral, planeLeft, planeRight) {
  const [keys, setKeys] = useState({
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
  });

  const [planeSprite, setPlaneSprite] = useState(planeNeutral);
  const [propellerFrame, setPropellerFrame] = useState(0);

  /*
    * Escucha eventos de teclado y actualiza el estado de teclas presionadas.
    * Se usa para controlar movimiento y disparo.
  */
  const handleKeyEvents = () => {
    useEffect(() => {
      const down = (e) => {
        if (e.code in keys) setKeys((prev) => ({ ...prev, [e.code]: true }));
      };
      const up = (e) => {
        if (e.code in keys) setKeys((prev) => ({ ...prev, [e.code]: false }));
      };
      window.addEventListener('keydown', down);
      window.addEventListener('keyup', up);
      return () => {
        window.removeEventListener('keydown', down);
        window.removeEventListener('keyup', up);
      };
    }, []);
  };

  /*
    * Mueve el avión en pantalla según las teclas presionadas.
    * También actualiza la posición de la sombra y la hélice.
    * Cambia el sprite del avión según la dirección horizontal.
  */
  const updatePlanePosition = () => {
    useEffect(() => {
      let animationId;
      const move = () => {
        const plane = planeRef.current;
        const shadow = shadowRef.current;
        const propeller = propellerRef.current;
        if (!plane || !shadow || !propeller) return;

        const left = parseInt(plane.style.left || '200');
        const top = parseInt(plane.style.top || '400');

        let newLeft = left;
        let newTop = top;

        if (keys.ArrowLeft && left > 0) {
          newLeft -= 6;
          setPlaneSprite(planeLeft);
        } else if (keys.ArrowRight && left < 435) {
          newLeft += 6;
          setPlaneSprite(planeRight);
        } else {
          setPlaneSprite(planeNeutral);
        }

        if (keys.ArrowUp && top > 0) newTop -= 6;
        if (keys.ArrowDown && top < 635) newTop += 6;

        plane.style.left = `${newLeft}px`;
        plane.style.top = `${newTop}px`;

        shadow.style.left = `${newLeft + 10}px`;
        shadow.style.top = `${newTop + 10}px`;

        propeller.style.left = `${newLeft + 25}px`;
        propeller.style.top = `${newTop - 3}px`;

        animationId = requestAnimationFrame(move);
      };
      move();
      return () => cancelAnimationFrame(animationId);
    }, [keys]);
  };

  // Alterna entre los dos sprites de hélice para simular rotación
  useEffect(() => {
    const interval = setInterval(() => {
      setPropellerFrame((prev) => (prev === 0 ? 1 : 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return {
    keys,
    planeSprite,
    propellerFrame,
    handleKeyEvents,
    updatePlanePosition,
  };
}

export default usePlaneControls;

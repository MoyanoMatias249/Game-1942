//frontend/src/hooks/useClouds.jsx
import { useEffect, useState } from 'react';
import cloud1 from '../assets/cloud1.png';
import cloud2 from '../assets/cloud2.png';
import cloud3 from '../assets/cloud3.png';
import cloud4 from '../assets/cloud4.png';

const cloudSprites = [cloud1, cloud2, cloud3, cloud4];

/*
  * Hook que genera nubes decorativas en pantalla y las mueve horizontalmente.
  * Las nubes aparecen aleatoriamente y se eliminan al salir del área visible.
*/
function useClouds(isGameStarted, isPaused) {
    const [clouds, setClouds] = useState([]);

    /*
        * Genera una nueva nube cada 1.5 segundos si el juego está activo.
        * Evita que dos nubes estén demasiado cerca en el eje Y.
    */
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isGameStarted || isPaused) return;
            if (Math.random() < 0.5) return; 
            const whichCloud = Math.floor(Math.random() * cloudSprites.length);
            const y = Math.random() * 600;

            const tooClose = clouds.some((c) => Math.abs(c.y - y) < 80);
            if (tooClose) return;

            const cloud = {
                x: 520,
                y,
                sprite: cloudSprites[whichCloud],
                speed: 0.3, // velocidad constante y lenta
            };

            setClouds((prev) => [...prev, cloud]);
        }, 1500); // cada 1 segundo

        return () => clearInterval(interval);
    }, [isGameStarted, isPaused]);

    /*
        * Mueve todas las nubes hacia la izquierda en cada frame.
        * Elimina las que salen por el borde izquierdo.
    */
    useEffect(() => {
        if (!isGameStarted || isPaused) return;
        let animationId;
        
        const animate = () => {
            setClouds((prev) =>
                prev
                .map((c) => ({ ...c, x: c.x - c.speed }))
                .filter((c) => c.x > -200) // margen más amplio por tamaño
            );
            if (isPaused) return;
            animationId = requestAnimationFrame(animate);
        };
        if (isPaused) return;
        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isGameStarted, isPaused]);

    return [clouds, setClouds];
}

export default useClouds;

//frontend/src/hooks/enemies/useEnemyBullets.js
import { useEffect, useState } from 'react';

/*
  * Hook que gestiona las balas disparadas por los enemigos.
  * Detecta cuándo cada enemigo debe disparar y genera las balas con dirección y velocidad.
  * También actualiza la posición de cada bala en pantalla en cada frame.
*/
function useEnemyBullets(enemies) {
    const [enemyBullets, setEnemyBullets] = useState([]);

    /*
        * Este efecto se ejecuta cada vez que cambia el array de enemigos.
        * Recorre todos los enemigos activos y genera balas si tienen la propiedad `shoot` en true.
        * Cada tipo de enemigo tiene su propio patrón de disparo.
    */
    useEffect(() => {
        const newBullets = [];

        enemies.forEach((e) => {
            const leftShots = Math.floor(Math.random() * 2) + 1;  // entre 1 y 2 balas por lado
            const rightShots = Math.floor(Math.random() * 2) + 1;

            /*
                * Jefe (black): dispara en abanico desde ambos lados.
                * Cada bala tiene un ángulo aleatorio entre 45° y 135°.
            */
            if (e.shoot && e.type === 'black') {
                for (let i = 0; i < leftShots; i++) {
                    const angle = Math.random() * Math.PI / 2 + Math.PI / 4; // entre 45° y 135°
                    const speed = 3 + Math.random() * 2;
                    newBullets.push({
                        x: e.x + 200,
                        y: e.y + 100,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed
                    });
                }
                for (let i = 0; i < rightShots; i++) {
                    const angle = Math.random() * Math.PI / 2 + Math.PI / 4; // entre 45° y 135°
                    const speed = 3 + Math.random() * 2;
                    newBullets.push({
                        x: e.x + 0,
                        y: e.y + 100,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed
                    });
                }
            }

            /*
                * Enemigo púrpura (purple): dispara dos balas inclinadas en diagonal.
                * Una hacia la izquierda y otra hacia la derecha.
            */
            else if (e.shoot && e.type === 'purple') {
                    newBullets.push({
                    x: e.x + 10,
                    y: e.y + 60,
                    vx: -1.2,
                    vy: 4
                });
                    newBullets.push({
                    x: e.x + 60,
                    y: e.y + 60,
                    vx: 1.2,
                    vy: 4.5
                });
            } 
            /*
                * Enemigos comun (brown): disparan una bala recta hacia abajo.
                * La posición vertical tiene una pequeña variación aleatoria.
            */
            else if (e.shoot) {
                // Disparo normal recto
                newBullets.push({
                    x: e.x + 25,
                    y: e.y + 60 + Math.random() * 10,
                    vx: 0,
                    vy: 6
                });
            }
        });

        // Si se generaron nuevas balas, se agregan al estado
        if (newBullets.length > 0) {
            setEnemyBullets((prev) => [...prev, ...newBullets]);
        }
    }, [enemies]);

    /*
        * Este efecto actualiza la posición de cada bala en pantalla cada 16ms (~60fps).
        * También elimina las balas que salen del área visible (y > 700).
    */
    useEffect(() => {
        const interval = setInterval(() => {
            setEnemyBullets((prev) =>
                prev
                .map((b) => ({
                    ...b,
                    x: b.x + (b.vx ?? 0),
                    y: b.y + b.vy
                    }))
                .filter((b) => b.y < 700)
            );
        }, 16);
        return () => clearInterval(interval);
    }, []);

    return [enemyBullets, setEnemyBullets];
}

export default useEnemyBullets;

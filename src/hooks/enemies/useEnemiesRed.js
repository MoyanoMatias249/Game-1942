//frontend/src/hooks/enemies/useEnemiesRed.js

/*
  * Define el comportamiento del enemigo rojo.
  * Se mueve siguiendo una curva de Bézier y luego escapa hacia arriba si no fue destruido.
*/
export function createRedEnemy() {
  const startX = Math.random() * 460;
  const controlX = Math.random() * 460;
  const controlY = Math.random() * 250;
  const endX = Math.random() * 460;

  return {
    type: 'red',
    x: startX,
    y: -50,
    t: 0, // parámetro de la curva Bézier
    path: { startX, controlX, controlY, endX },
    health: 1,
    points: 100,
    escaping: false,
    rotation: 0
  };
}

export function updateRedEnemy(enemy) {
  let t = enemy.t + 0.01;

  /*
    * Si está escapando, sube rápidamente hasta salir de pantalla.
  */
  if (enemy.escaping) {
    const newY = enemy.y - 6;
    if (newY < -60) return null;
    return { ...enemy, y: newY };
  }

  /*
    * Si terminó la curva (t > 1), verifica si está en el fondo.
    * Si está en y >= 650, entra en modo escape.
    * Si no, se elimina directamente.
  */
  if (t > 1) {
    if (enemy.y >= 650) {
      return { ...enemy, escaping: true, rotation: 180 };
    }
    return null;
  }

   /*
    * Movimiento por curva de Bézier cuadrática.
    * Calcula posición x, y en función del parámetro t.
  */
  const { startX, controlX, controlY, endX } = enemy.path;
  const x = (1 - t) ** 2 * startX + 2 * (1 - t) * t * controlX + t ** 2 * endX;
  const y = (1 - t) ** 2 * -50 + 2 * (1 - t) * t * controlY + t ** 2 * 700;

  return { ...enemy, x, y, t };
}

// frontend/src/hooks/enemies/useEnemiesBlue.js

/*
  * Define el comportamiento del enemigo azul.
  * Aparece por la derecha, vuela en línea recta hacia la izquierda.
  * Si llega al borde izquierdo, se da vuelta y vuelve.
  * Si sale por la derecha en su regreso, se elimina.
*/
export function createBlueEnemy() {
  const startY = Math.random() * 400 + 100;
  return {
    type: 'blue',
    x: 520,
    y: startY,
    vx: -7,
    health: 1,
    points: 150,
    rotation: 90,
    returning: false
  };
}

export function updateBlueEnemy(enemy) {
  const newX = enemy.x + enemy.vx;

  // Si está volviendo y sale por la derecha, se elimina
  if (enemy.returning && newX > 520) return null;

  // Si llegó al borde izquierdo, se da vuelta y cambia rotación
  if (!enemy.returning && newX < -40) {
    return {
      ...enemy,
      vx: 4,
      returning: true,
      rotation: 270
    };
  }

  return { ...enemy, x: newX };
}


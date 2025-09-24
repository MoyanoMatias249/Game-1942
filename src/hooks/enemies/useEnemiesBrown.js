//frontend/src/hooks/enemies/useEnemiesBrown.js

/*
  * Define el comportamiento del enemigo marrón.
  * Se mueve en diagonal desde los bordes, rebota verticalmente y dispara cada cierto tiempo.
*/
export function createBrownEnemy() {
  const startY = Math.random() * 200 + 50;
  const fromLeft = Math.random() < 0.5;
  const vx = fromLeft ? 2.5 : -2.5;
  const vy = -1.5;
  const rotation = getRotation(vx, vy); 

  return {
    type: 'brown',
    x: fromLeft ? -50 : 520,
    y: startY,
    vx,
    vy,
    health: 3,
    points: 200,
    rotation,
    shootCooldown: 0,
    shootInterval: Math.floor(Math.random() * 30 + 30),
    shoot: false
  };
}

export function updateBrownEnemy(enemy) {
  const newX = enemy.x + enemy.vx;
  const newY = enemy.y + enemy.vy;

  // Rebote vertical: si toca arriba o abajo, invierte dirección vertical
  let newVy = enemy.vy;
  if (newY < 0) newVy = Math.abs(enemy.vy);
  if (newY > 600) newVy = -Math.abs(enemy.vy);

  // Disparo cada 45 frames
  const shootCooldown = (enemy.shootCooldown ?? 0) + 1;
  const shouldShoot = shootCooldown >= 45;

  return {
    ...enemy,
    x: newX,
    y: newY,
    vy: newVy,
    shootCooldown: shouldShoot ? 0 : shootCooldown,
    shoot: shouldShoot,
    rotation: getRotation(enemy.vx, newVy)
  };
}

/*
  * Calcula la rotación visual del sprite según dirección de movimiento.
*/
function getRotation(vx, vy) {
  if (vx < 0 && vy < 0) return 135; 
  if (vx < 0 && vy > 0) return 45;
  if (vx > 0 && vy < 0) return 225;
  if (vx > 0 && vy > 0) return 315;
  return 0;
}

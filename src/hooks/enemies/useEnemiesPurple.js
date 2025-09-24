//frontend/src/hooks/enemies/useEnemiesPurple.js

/*
  * Define el comportamiento del enemigo púrpura.
  * Tiene dos fases: 'ascending' (sube desde abajo) y 'attacking' (baja lentamente y dispara).
*/
export function createPurpleEnemy() {
  const startX = Math.random() * 400 + 50;

  return {
    type: 'purple',
    x: startX,
    y: 700,
    vx: 0,
    vy: -3, // sube
    health: 5, // triple de vida
    points: 400,
    rotation: 0, // mirando hacia arriba
    phase: 'ascending',
    shootCooldown: 0,
    shootInterval: 60,
    shoot: false
  };
}

export function updatePurpleEnemy(enemy) {
  let { x, y, vy, phase, shootCooldown, shootInterval } = enemy;
  
  /*
    * Fase 1: sube desde abajo hasta y < 50.
    * Luego cambia a fase 'attacking' y empieza a bajar lentamente.
  */
  if (phase === 'ascending') {
      y += vy;
      if (y < 50) {
          phase = 'attacking';
          vy = 1; // baja lentamente
      }
  } 
  /*
    * Fase 2: baja lentamente y acumula cooldown para disparar.
  */
  else if (phase === 'attacking') {
      y += vy;
      shootCooldown += 1;
  }

  const shouldShoot = phase === 'attacking' && shootCooldown >= shootInterval;

  return {
    ...enemy,
    x,
    y,
    vy,
    phase,
    shootCooldown: shouldShoot ? 0 : shootCooldown,
    shoot: shouldShoot,
    rotation: phase === 'ascending' ? 180 : 0
  };
}

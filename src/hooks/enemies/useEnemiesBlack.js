//frontend/src/hooks/enemies/useEnemiesBlack.js

/*
  * Define la creación y comportamiento del jefe.
  * Tiene tres fases: 'descending' (baja desde arriba), 'active' (se mueve y dispara),
  * y 'retreating' (se retira si no es derrotado en 15 segundos).
*/
export function createBlackBoss() {
  return {
    type: 'black',
    x: 100,
    y: -250,
    vx: 1.2,
    vy: 1.5,
    width: 280,
    height: 200,
    health: 125,
    points: 3000,
    shootCooldown: 0,
    shootInterval: 60,
    shoot: false,
    phase: 'descending',
    rotation: 0,
    lifetime: 0
  };
}


export function updateBlackBoss(enemy) {
  let { x, y, vx, vy, phase, shootCooldown, shootInterval, lifetime } = enemy;
  lifetime += 1;

  /*
    * Fase 1: descendiendo desde fuera de pantalla.
    * Cuando llega a y = 75, pasa a fase activa.
  */
  if (phase === 'descending') {
    y += vy;
    if (y >= 75) {
      phase = 'active';
    }
  } 
  
   /*
    * Fase 2: activo. Se mueve horizontalmente y dispara.
    * Rebota si toca los bordes laterales.
    * Si pasa 900 frames (~15 segundos), entra en fase de retirada.
  */
  else if (phase === 'active') {
    x += vx;
    shootCooldown += 1;

    if (x <= 0 || x >= 320) {
      vx *= -1; 
    }

    if (lifetime >= 900) {
      phase = 'retreating';
    }

  } 

  /*
    * Fase 3: retirada. Sube rápidamente y deja de disparar.
    * Se elimina cuando sale de pantalla (y < -300).
  */
  else if (phase === 'retreating') {
    y -= 3;
    shootCooldown = 0;
  }

  const shouldShoot = phase === 'active' && shootCooldown >= shootInterval;

  return {
    ...enemy,
    x,
    y,
    vx,
    phase,
    shootCooldown: shouldShoot ? 0 : shootCooldown,
    shoot: shouldShoot,
    lifetime
  };
}

//frontend/src/config/levels.js

/*
  * Configuración de niveles del juego.
  * Cada nivel tiene una duración y una lista de eventos con enemigos que aparecen en momentos específicos.
*/
const levels = [
  {
    name: 'Level 1',
    duration: 28000,
    events: [
      { time: 3000, enemies: [{ type: 'red', count: 2 }] },
      { time: 5000, enemies: [{ type: 'red', count: 3 }] },
      { time: 7000, enemies: [{ type: 'red', count: 5 }] },
      { time: 10000, enemies: [{ type: 'blue', count: 3 }] },
      { time: 11000, enemies: [{ type: 'red', count: 3 }] },
      { time: 13000, enemies: [{ type: 'red', count: 4 }] },
      { time: 16000, enemies: [{ type: 'blue', count: 2 }] },
      { time: 19000, enemies: [{ type: 'red', count: 3 }, { type: 'blue', count: 2 }] },
      { time: 22000, enemies: [{ type: 'red', count: 4 }, { type: 'blue', count: 4 }] },
      { time: 25000, enemies: [{ type: 'red', count: 5 }, { type: 'blue', count: 5 }] },
      { time: 26000, enemies: [{ type: 'red', count: 2 }, { type: 'blue', count: 2 }] }
    ]
  },
  {
    name: 'Level 2',
    duration: 38000,
    events: [
      { time: 3000, enemies: [{ type: 'blue', count: 3 }] },
      { time: 5000, enemies: [{ type: 'red', count: 3 }] },
      { time: 7000, enemies: [{ type: 'blue', count: 3 }] },
      { time: 8000, enemies: [{ type: 'brown', count: 3 }] },
      { time: 11000, enemies: [{ type: 'blue', count: 3 }, { type: 'red', count: 4 }] },
      { time: 14000, enemies: [{ type: 'blue', count: 3 }, { type: 'brown', count: 2 }] },
      { time: 17000, enemies: [{ type: 'brown', count: 5 }, { type: 'red', count: 3 }] },
      { time: 20000, enemies: [{ type: 'brown', count: 3 }] },
      { time: 23000, enemies: [{ type: 'purple', count: 2 }] },
      { time: 26000, enemies: [{ type: 'blue', count: 4 }, { type: 'red', count: 5 }] },
      { time: 29000, enemies: [{ type: 'brown', count: 4 }, { type: 'blue', count: 2 }] },
      { time: 32000, enemies: [{ type: 'red', count: 5 }, { type: 'purple', count: 2 }] },
      { time: 36000, enemies: [{ type: 'red', count: 6 }, { type: 'brown', count: 6 }] }
    ]
  },
  {
    name: 'Level 3',
    duration: 52000,
    events: [
      { time: 3000, enemies: [{ type: 'purple', count: 4 } ]},
      { time: 6000, enemies: [{ type: 'brown', count: 3 }, { type: 'blue', count: 3 }] },
      { time: 9000, enemies: [{ type: 'blue', count: 4 }, { type: 'red', count: 4 }] },
      { time: 12000, enemies: [{ type: 'brown', count: 4 }, { type: 'red', count: 6 }] },
      { time: 15000, enemies: [{ type: 'red', count: 5 }, { type: 'purple', count: 3 }] },
      { time: 18000, enemies: [{ type: 'blue', count: 4 }, { type: 'brown', count: 4 }] },
      { time: 21000, enemies: [{ type: 'red', count: 4 }, { type: 'brown', count: 6 }] },
      { time: 24000, enemies: [{ type: 'blue', count: 5 }, { type: 'red', count: 5 }] },
      { time: 26000, enemies: [{ type: 'purple', count: 4 }] },
      { time: 28000, enemies: [{ type: 'red', count: 5 }, { type: 'brown', count: 5 }] },
      { time: 30000, enemies: [{ type: 'black', count: 1 }] },
      { time: 37000, enemies: [{ type: 'brown', count: 2 }] },
      { time: 45000, enemies: [{ type: 'red', count: 2 }] },
      { time: 47000, enemies: [{ type: 'purple', count: 4 }] },
      { time: 50000, enemies: [{ type: 'red', count: 7 }, { type: 'brown', count: 8 }, { type: 'blue', count: 6 }] }
    ]
  }
];

export default levels;

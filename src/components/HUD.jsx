//frontend/src/components/HUD.jsx

/*
  * Renderiza el HUD con información de score, high score, nivel actual y vidas restantes.
  * Se divide en dos secciones: izquierda (score) y derecha (nivel y vidas).
*/
function HUD({ score, highScore, lives, levelName }) {
  return (
    <div className="hud">
      <div className="hud-left">
        <span>Score: {score}</span>
        <span>High Score: {highScore}</span>
      </div>
      <div className="hud-right">
        <span>{levelName}</span>
        <span>Lives: {lives}</span>
      </div>
    </div>
  );
}

export default HUD;

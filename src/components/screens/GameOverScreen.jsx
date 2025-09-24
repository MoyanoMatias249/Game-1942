// frontend/src/components/GameOverScreen.jsx

/*
  * Renderiza la pantalla de Game Over con usuario, score y cuenta regresiva para reiniciar.
  * Usa un temporizador interno para mostrar "Reiniciando en..." cada segundo.
*/
import { useState, useEffect } from "react";

function GameOverScreen({ username, score }) {
  const [mensaje, setMensaje] = useState(3);

  useEffect(() => {
    const countdown = setInterval(() => {
      setMensaje((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 1;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="screen go-screen">
      <nav>
        <ul>
          <li>
            <p>User:</p>
            <p>{username}</p>
          </li>
          <li>
            <p>Score:</p>
            <p>{score}</p>
          </li>
        </ul>
      </nav>
      <h2>Game Over</h2>
      <p className="screen-text go-text">Reiniciando en... {mensaje}</p>
    </div>
  );
}

export default GameOverScreen;
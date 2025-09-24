// frontend/src/components/StartScreen.jsx

/*
  * Renderiza la pantalla de inicio con usuario, high score y mensaje para comenzar.
  * Se muestra antes de que el jugador presione espacio para iniciar el juego.
*/
function StartScreen({ username, highScore }) {
  return (
    <div className="screen start-screen">
      <nav>
        <ul>
          <li>
            <p>User:</p>
            <p>{username}</p>
          </li>
          <li>
            <p>High:</p>
            <p>{highScore}</p>
          </li>
        </ul>
      </nav>
      <h1>1942</h1>
      <p className="screen-text start-text">Press: Space</p>
    </div>
  );
}

export default StartScreen;

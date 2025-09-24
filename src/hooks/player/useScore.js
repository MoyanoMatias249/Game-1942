//frontend/src/hooks/player/useScore.js

/*
  * Hook que gestiona el puntaje actual y el récord guardado en localStorage.
  * Si el score supera el récord, lo actualiza automáticamente.
*/
import { useState, useEffect } from 'react';

function useScore(username = 'Usuario') {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('highScore')) || 0;
  });

  // Actualiza el récord si el score actual lo supera
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score);
      localStorage.setItem('lastPlayer', username); 
    }
  }, [score, highScore, username]);

  return { score, setScore, highScore };
}

export default useScore;

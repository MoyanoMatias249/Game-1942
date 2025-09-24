//frontend/src/hooks/player/useUserData.jsx

/*
  * Hook que recupera el nombre de usuario y el récord desde localStorage.
  * Se usa para mostrar en la pantalla de inicio y Game Over.
*/
import { useState, useEffect } from 'react';

function useUserData() {
  const [username, setUsername] = useState('Usuario');
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedHigh = localStorage.getItem('highScore');

    if (storedName) setUsername(storedName);
    if (storedHigh) setHighScore(parseInt(storedHigh));
  }, []);

  return { username, highScore };
}

export default useUserData;

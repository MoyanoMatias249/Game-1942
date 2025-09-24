//frontend/src/components/Game1942.jsx
import { useState, useEffect, useRef } from 'react';

// Estilos base y variables
import '../styles/base.css';

// Estilos modulares
import '../styles/layout.css';
import '../styles/hud.css';
import '../styles/screens.css';
import '../styles/plane.css';
import '../styles/enemies.css';
import '../styles/effects.css';
import '../styles/responsive.css'

// Assets
import background from "../assets/background.png";
import plane_n from "../assets/plane-neutral.png";
import plane_l from "../assets/plane-left.png";
import plane_r from "../assets/plane-right.png";
import plane_s from "../assets/plane-shadow.png";
import propeller_1 from "../assets/propeller1.png";
import propeller_2 from "../assets/propeller2.png";
import smoke from "../assets/smoke.png";
import bullet from "../assets/bullet.png";
import ship from '../assets/ship.png';

// Hooks - Jugador
import usePlaneControls from '../hooks/player/usePlaneControls';
import useSmokeTrail from '../hooks/player/useSmokeTrail';
import useBullets from '../hooks/player/useBullets';
import useLives from '../hooks/player/useLives';
import usePlayerCollision from '../hooks/player/usePlayerCollision';
import useScore from '../hooks/player/useScore';
import useUserData from '../hooks/player/useUserData';

// Hooks - Enemigos
import useEnemies from '../hooks/enemies/useEnemies';
import useEnemyBullets from '../hooks/enemies/useEnemyBullets';
import useCollisions from '../hooks/enemies/useCollisions';

// Hooks - Generales
import useExplosions from '../hooks/useExplosions';
import useClouds from '../hooks/useClouds';
import useLevelManager from '../hooks/useLevelManager';
import useArrivalShip from '../hooks/useArrivalShip';

// Componentes
import Plane from './player/Plane';
import SmokeTrail from './player/SmokeTrail';
import Bullets from './player/Bullets';
import Enemies from './enemies/Enemies';
import EnemyBullets from './enemies/EnemyBullets';
import Explosions from './Explosions';
import Clouds from './Clouds';
import HUD from './Hud';
import StartScreen from './screens/StartScreen';
import GameOverScreen from './screens/GameOverScreen';

function Game1942() {
  // Referencias visuales del avión
  const planeRef = useRef(null);
  const shadowRef = useRef(null);
  const propellerRef = useRef(null);

  // Estados principales del juego
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Estados de transición y overlays
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayShown, setOverlayShown] = useState(false);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const [lastOverlayTime, setLastOverlayTime] = useState(0);

  // Puntuación y explosiones
  const { score, setScore, highScore } = useScore();
  const { explosions, triggerExplosion, explosionFrames } = useExplosions();

  // Control de avance de nivel si el jugador muere
  const [blockLevelAdvance, setBlockLevelAdvance] = useState(false);

  // Vidas y daño del jugador
  const { lives, setLives, isImmune, blink, triggerDamage } = useLives(() => {
    setBlockLevelAdvance(true);
    setIsGameOver(true);
    setTimeout(() => {
      resetGame();
      setBlockLevelAdvance(false);
    }, 3000);
  }, planeRef, triggerExplosion);

  // Controles del avión
  const {
    keys,
    planeSprite,
    propellerFrame,
    handleKeyEvents,
    updatePlanePosition
  } = usePlaneControls(planeRef, shadowRef, propellerRef, plane_n, plane_l, plane_r);

  // Efectos visuales y enemigos
  const smokeTrail = useSmokeTrail(planeRef);
  const [enemies, setEnemies, spawnEnemies, enemyPropellerFrame] = useEnemies(isGameStarted && !isPaused);
  const [bullets, setBullets] = useBullets(keys, planeRef);
  const [enemyBullets, setEnemyBullets] = useEnemyBullets(enemies);
  const [clouds, setClouds] = useClouds(isGameStarted && !isPaused);

  // Colisiones
  useCollisions(bullets, enemies, setBullets, setEnemies, triggerExplosion, setScore, isPaused);
  usePlayerCollision(enemies, enemyBullets, planeRef, triggerDamage, isGameStarted && !isPaused);

  // Datos del usuario
  const { username, highScore: storedHighScore } = useUserData();

  // Control de niveles
  const { level, elapsed, advanceLevel, resetLevel } = useLevelManager(isGameStarted, isPaused, spawnEnemies);
  const { y: arrivalY, visible: arrivalVisible } = useArrivalShip(elapsed, level.duration);

  // Detecta la tecla espacio para iniciar el juego
  handleKeyEvents();

  // Actualiza la posición del avión en cada frame
  updatePlanePosition();

  // Inicia el juego al presionar espacio
  useEffect(() => {
    const handleStart = (e) => {
      if (e.code === 'Space') {
        setIsGameStarted(true);
      }
    };

    if (!isGameStarted && !isGameOver) {
      window.addEventListener('keydown', handleStart);
      return () => window.removeEventListener('keydown', handleStart);
    }
  }, [isGameStarted, isGameOver]);

  // Limpia enemigos y efectos si el juego no está activo
  useEffect(() => {
    if (!isGameStarted && !isGameOver) {
      setEnemies([]);
      setBullets([]);
      setClouds([]);
      triggerExplosion(-999, -999);
    }
  }, [isGameStarted, isGameOver]);

  // Reinicia el juego completo
  const resetGame = () => {
    setIsGameStarted(false);
    setIsGameOver(false);
    setShowOverlay(false);
    setOverlayShown(false);
    setIsTransitioningOut(false);
    setScore(0);
    setLives(3);
    setEnemies([]);
    setBullets([]);
    setEnemyBullets([]);
    setClouds([]);
    triggerExplosion(-999, -999);
    resetLevel();

    if (planeRef.current) {
      planeRef.current.style.left = '200px';
      planeRef.current.style.top = '400px';
    }
  };

  // Pausa el juego si se cambia de pestaña
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.visibilityState !== 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Detecta llegada del barco para mostrar overlay de nivel completado
  useEffect(() => {
    const now = Date.now();
    if (
      arrivalVisible &&
      arrivalY >= 400 &&
      !showOverlay &&
      !overlayShown &&
      !isTransitioningOut &&
      now - lastOverlayTime > 3000
    ) {
      setIsPaused(true);
      setIsTransitioningOut(true);
      setOverlayShown(true);
      setShowOverlay(true);
      setLastOverlayTime(now);
    }
  }, [arrivalVisible, arrivalY, showOverlay, overlayShown, isTransitioningOut, lastOverlayTime]);

  // Maneja transición entre niveles o final del juego
  useEffect(() => {
    if (showOverlay && !isGameOver && !blockLevelAdvance) {
      const timeout = setTimeout(() => {
        setEnemies([]);
        setBullets([]);
        setEnemyBullets([]);
        setClouds([]);
        triggerExplosion(-999, -999);

        setIsPaused(false);
        setShowOverlay(false);
        setOverlayShown(false);
        setIsTransitioningOut(false);

        if (level.name === 'Level 3') {
          setIsGameStarted(false);
          setIsGameOver(false);
          resetGame();
        } else {
          advanceLevel();
          setIsGameStarted(true);
        }

        if (planeRef.current) {
          planeRef.current.style.left = '200px';
          planeRef.current.style.top = '400px';
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showOverlay]);

  return (
    <div className={`game1942-container ${isPaused ? 'paused' : ''}`}>
      {!isGameStarted && !isGameOver && (
        <StartScreen username={username} highScore={storedHighScore} />
      )}
      {isGameOver && (
        <GameOverScreen username={username} score={score} />
      )}

      {isGameStarted && !isGameOver && (
        <>
          <div className="background-wrapper">
            <img src={background} alt="background" className="background" />
            <img src={background} alt="background" className="background" />
          </div>

          <Clouds clouds={clouds} />
          {!isTransitioningOut && (
            <HUD score={score} highScore={highScore} lives={lives} levelName={level.name} />
          )}
          <Plane
            planeRef={planeRef}
            shadowRef={shadowRef}
            propellerRef={propellerRef}
            planeSprite={planeSprite}
            planeShadow={plane_s}
            propellerSprites={[propeller_1, propeller_2]}
            propellerFrame={propellerFrame}
            blink={blink}
          />

          <SmokeTrail smokeTrail={smokeTrail} smoke={smoke} />
          <Enemies enemies={enemies} enemyPropellerFrame={enemyPropellerFrame} />
          <Bullets bullets={bullets} bulletSprite={bullet} />
          <EnemyBullets bullets={enemyBullets} bulletSprite={bullet} />
          <Explosions explosions={explosions} explosionFrames={explosionFrames} />

          {/* Barco de salida al inicio del nivel */}
          {elapsed < 3000 && (
            <div className="mission-ship-wrapper">
              <img src={ship} alt="ship" className="mission-ship" key={`start-${level.name}`} />
            </div>
          )}

          {/* Barco de llegada al final del nivel */}
          {arrivalVisible && (
            <div className="arrival-ship-wrapper">
              <img src={ship} alt="arrival-ship" className="arrival-ship" />
            </div>
          )}

          {/* Pantalla de victoria si es el último nivel */}
          {showOverlay && level.name === 'Level 3' && (
            <div className="level-complete-overlay">
              <div className="text-overlay victory-overlay">
                <h2>¡Victoria!</h2>
                <p>Completaste todos los niveles</p>
                <p>Score final: {score}</p>
              </div>
            </div>
          )}

          {/* Overlay de nivel completado para niveles intermedios */}
          {showOverlay && level.name !== 'Level 3' && (
            <div className="level-complete-overlay">
              <div className="text-overlay">
                <h2>Level Complete</h2>
                <p>score: {score}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Game1942;

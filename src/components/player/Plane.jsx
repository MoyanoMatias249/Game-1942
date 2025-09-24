//frontend/src/components/player/Plane.jsx

/*
  * Renderiza el avión del jugador con su sprite, sombra y hélice animada.
  * También muestra un círculo de colisión visual para depuración.
*/
function Plane({ planeRef, shadowRef, propellerRef, planeSprite, planeShadow, propellerSprites, propellerFrame, blink}) {
  return (
    <>
    <div
      style={{
        position: 'absolute',
        left: `${parseInt(planeRef.current?.style.left || '200px') + 12.5}px`,
        top: `${parseInt(planeRef.current?.style.top || '400px') + 5}px`,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    ></div>
      <img
        src={planeSprite}
        alt="plane"
        className="plane"
        ref={planeRef}
        style={{
          left: '200px',
          top: '400px',
          opacity: blink ? 0 : 1,
          transition: 'opacity 0.1s'
        }}
      />
      <img
        src={planeShadow}
        alt="shadow"
        className="shadow"
        ref={shadowRef}
        style={{ left: '215px', top: '415px' }}
      />
      <img
        src={propellerSprites[propellerFrame]}
        alt="propeller"
        className="propeller"
        ref={propellerRef}
        style={{ 
          left: '238px', 
          top: '360px',
          opacity: blink ? 0 : 1,
          transition: 'opacity 0.1s' 
        }}
      />
    </>
  );
}

export default Plane;

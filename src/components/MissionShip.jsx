// frontend/src/components/MissionShip.jsx
function MissionShip({ position = 'bottom', flipped = false, sprite }) {
  const styles = {
    position: 'absolute',
    left: '50%',
    transform: `translateX(-50%) ${flipped ? 'rotate(180deg)' : ''}`,
    bottom: position === 'bottom' ? '0px' : undefined,
    top: position === 'top' ? '0px' : undefined,
    zIndex: 10
  };

  return <img src={sprite} alt="mission-ship" style={styles} className="mission-ship" />
}

export default MissionShip;

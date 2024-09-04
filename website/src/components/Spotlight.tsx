import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useIsHoveringButton } from '../context/IsHoveringButton';

const BLOB_SIZE = 75;

const SpotlightContext = createContext<{
  top: number;
  right: number;
  bottom: number;
  left: number;
}>({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});

export const useSpotlight = () => {
  const value = useContext(SpotlightContext);

  return value;
};

export function Spotlight({ children }: { children: React.ReactNode }) {
  const [mousePositionX, setMousePositionX] = useState(0);
  const [mousePositionY, setMousePositionY] = useState(0);

  const { isHoveringButton } = useIsHoveringButton();

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      setMousePositionX(event.clientX);
      setMousePositionY(event.clientY);
    });
  }, []);

  return (
    <SpotlightContext.Provider
      value={{
        left: mousePositionX - (BLOB_SIZE - 25) / 2,
        top: mousePositionY - (BLOB_SIZE - 25) / 2,
        bottom: mousePositionY + (BLOB_SIZE - 25) / 2,
        right: mousePositionX + (BLOB_SIZE - 25) / 2,
      }}
    >
      {!isHoveringButton && (
        <div
          className='fixed pointer-events-none'
          style={{
            zIndex: 30,
            top: mousePositionY - BLOB_SIZE / 2,
            left: mousePositionX - BLOB_SIZE / 2,
            width: BLOB_SIZE,
            height: BLOB_SIZE,
            borderRadius: 99999,
            opacity: 0.2,
            background:
              'radial-gradient(circle, #C580FC 0%, #C580FC 20%, #000 100%)',
          }}
        />
      )}
      {children}
    </SpotlightContext.Provider>
  );
}

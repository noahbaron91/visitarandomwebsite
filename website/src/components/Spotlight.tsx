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

  const [stretchX, setStretchX] = useState(1);
  const [stretchY, setStretchY] = useState(1);

  const cancelTimeoutRef = useRef<null | NodeJS.Timeout>(null);
  const { isHoveringButton } = useIsHoveringButton();
  // calculate movement speed and stretch the spotlight

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      //   if (cancelTimeoutRef.current !== null) {
      //     clearTimeout(cancelTimeoutRef.current);
      //   }

      //     // calculate stretch

      //   // check if moved within the 500ms
      //   const timeout = setTimeout(() => {
      //     cancelTimeoutRef.current = null;
      //   }, 500);

      //   cancelTimeoutRef.current = timeout;

      // setTimeout(() => {
      setMousePositionX(event.clientX);
      setMousePositionY(event.clientY);
      // }, 50);
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
          style={{
            position: 'fixed',
            zIndex: 999,
            pointerEvents: 'none',
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

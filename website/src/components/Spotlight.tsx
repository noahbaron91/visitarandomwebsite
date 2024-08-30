import { useEffect, useRef, useState } from 'react';

const BLOB_SIZE = 100;

export function Spotlight() {
  const [mousePositionX, setMousePositionX] = useState(0);
  const [mousePositionY, setMousePositionY] = useState(0);

  const [stretchX, setStretchX] = useState(1);
  const [stretchY, setStretchY] = useState(1);

  const cancelTimeoutRef = useRef<null | NodeJS.Timeout>(null);
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

      setTimeout(() => {
        setMousePositionX(event.clientX);
        setMousePositionY(event.clientY);
      }, 50);
    });
  }, []);

  return (
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
  );
}

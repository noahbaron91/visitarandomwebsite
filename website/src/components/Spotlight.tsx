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

const highlightHovered = ({
  mousePositionX,
  mousePositionY,
  isHoveringButton,
}: {
  mousePositionX: number;
  mousePositionY: number;
  isHoveringButton: boolean;
}) => {
  const elements = document.getElementsByClassName('url');

  const spotlight = {
    left: mousePositionX - (BLOB_SIZE - 25) / 2,
    top: mousePositionY - (BLOB_SIZE - 25) / 2,
    bottom: mousePositionY + (BLOB_SIZE - 25) / 2,
    right: mousePositionX + (BLOB_SIZE - 25) / 2,
  };

  Array.from(elements).forEach((element) => {
    const boundingBoxRect = element.getBoundingClientRect();

    const { top, left, right, bottom } = boundingBoxRect;

    if (
      isHoveringButton ||
      spotlight.left > right ||
      spotlight.right < left ||
      spotlight.top > bottom ||
      spotlight.bottom < top
    ) {
      (element as HTMLDivElement).style.color = '#292524';
      return;
    }

    (element as HTMLDivElement).style.color = '#c580fc';
  });
};

export function Spotlight({ children }: { children: React.ReactNode }) {
  const [mousePositionX, setMousePositionX] = useState(0);
  const [mousePositionY, setMousePositionY] = useState(0);

  const { isHoveringButton } = useIsHoveringButton();

  useEffect(() => {
    highlightHovered({ mousePositionX, mousePositionY, isHoveringButton });

    const clearInterval = setInterval(() => {
      highlightHovered({ mousePositionX, mousePositionY, isHoveringButton });
    }, 25);

    return () => {
      window.clearInterval(clearInterval);
    };
  }, [mousePositionX, mousePositionY, isHoveringButton]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePositionX(event.clientX);
      setMousePositionY(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
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

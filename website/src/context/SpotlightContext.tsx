import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useIsHoveringButton } from './IsHoveringButtonContext';
import { useHighlightHoveredText } from '../hooks/useHighlightHoveredText';
import { useMousePosition } from '../hooks/useMousePosition';
import { SPOTLIGHT_SIZE } from '../constants';

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

export function SpotlightProvider({ children }: { children: React.ReactNode }) {
  const { isHoveringButton } = useIsHoveringButton();

  const { mousePositionX, mousePositionY } = useMousePosition();

  useHighlightHoveredText({ mousePositionX, mousePositionY });

  const value = useMemo(
    () => ({
      left: mousePositionX - (SPOTLIGHT_SIZE - 25) / 2,
      top: mousePositionY - (SPOTLIGHT_SIZE - 25) / 2,
      bottom: mousePositionY + (SPOTLIGHT_SIZE - 25) / 2,
      right: mousePositionX + (SPOTLIGHT_SIZE - 25) / 2,
    }),
    [mousePositionX, mousePositionY]
  );

  const style = useMemo(
    () => ({
      top: mousePositionY - SPOTLIGHT_SIZE / 2,
      left: mousePositionX - SPOTLIGHT_SIZE / 2,
      width: SPOTLIGHT_SIZE,
      height: SPOTLIGHT_SIZE,
      background: 'radial-gradient(circle, #C580FC 0%, #C580FC 20%, #000 100%)',
    }),
    [mousePositionY, mousePositionX]
  );

  return (
    <SpotlightContext.Provider value={value}>
      {!isHoveringButton && (
        <div
          className='opacity-20 rounded-[9999px] fixed pointer-events-none z-30'
          style={style}
        />
      )}
      {children}
    </SpotlightContext.Provider>
  );
}

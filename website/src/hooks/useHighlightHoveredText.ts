import { useEffect } from 'react';
import { useIsHoveringButton } from '../context/IsHoveringButtonContext';
import { SPOTLIGHT_SIZE } from '../constants';

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
    left: mousePositionX - (SPOTLIGHT_SIZE - 25) / 2,
    top: mousePositionY - (SPOTLIGHT_SIZE - 25) / 2,
    bottom: mousePositionY + (SPOTLIGHT_SIZE - 25) / 2,
    right: mousePositionX + (SPOTLIGHT_SIZE - 25) / 2,
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

export const useHighlightHoveredText = ({
  mousePositionX,
  mousePositionY,
}: {
  mousePositionX: number;
  mousePositionY: number;
}) => {
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
};

import { useEffect, useRef, useState } from 'react';
import { useSpotlight } from './Spotlight';
import { useIsHoveringButton } from '../context/IsHoveringButton';

function Letter({
  value,
  ignoreIsHoveringButton,
}: {
  value: string;
  ignoreIsHoveringButton: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const spotlight = useSpotlight();
  const [isHighlighted, setIsHighlighted] = useState(false);
  const { isHoveringButton } = useIsHoveringButton();

  useEffect(() => {
    if (!ref.current) return;

    const boundingBoxRect = ref.current.getBoundingClientRect();

    const { top, left, right, bottom } = boundingBoxRect;

    if (
      spotlight.left > right ||
      spotlight.right < left ||
      spotlight.top > bottom ||
      spotlight.bottom < top
    ) {
      setIsHighlighted(false);
      return;
    }

    setIsHighlighted(true);
  }, [spotlight.left, spotlight.right, spotlight.top, spotlight.bottom]);

  if (ignoreIsHoveringButton) {
    return (
      <span
        ref={ref}
        style={{
          ...(isHighlighted && { color: '#c580fc' }),
        }}
      >
        {value}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      style={{
        ...(isHighlighted && !isHoveringButton && { color: '#c580fc' }),
      }}
    >
      {value}
    </span>
  );
}

export function HighlightOnHoverText({
  text,
  ignoreIsHoveringButton = false,
}: {
  text: string;
  ignoreIsHoveringButton?: boolean;
}) {
  const textArr = text.split('');

  return (
    <>
      {textArr.map((letter, index) => (
        <Letter
          value={letter}
          key={index}
          ignoreIsHoveringButton={ignoreIsHoveringButton}
        />
      ))}
    </>
  );
}

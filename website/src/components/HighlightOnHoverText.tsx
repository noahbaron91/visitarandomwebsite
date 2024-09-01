import { useEffect, useRef, useState } from 'react';
import { useSpotlight } from './Spotlight';

function Letter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const spotlight = useSpotlight();
  const [isHighlighted, setIsHighlighted] = useState(false);

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

  return (
    <span ref={ref} style={{ ...(isHighlighted && { color: '#c580fc' }) }}>
      {value}
    </span>
  );
}

export function HighlightOnHoverText({ text }: { text: string }) {
  const textArr = text.split('');

  return (
    <>
      {textArr.map((letter, index) => (
        <Letter value={letter} key={index} />
      ))}
    </>
  );
}

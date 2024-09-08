import { useEffect, useState } from 'react';
import { DesktopScrollAnimation } from './DesktopScrollAnimation';
import { MobileScrollAnimation } from './MobileScrollAnimation';
import { useURL } from '../../hooks/useURL';
import { Spinner } from '../Spinner';
import { useInstantModeEnabled } from '../../context/InstantModeEnabledContext';

export function ScrollAnimation({ onReroll }: { onReroll: () => void }) {
  const url = useURL();

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  if (!url || typeof windowWidth !== 'number') {
    return (
      <div className='fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Spinner />
      </div>
    );
  }

  if (windowWidth > 968) {
    return <DesktopScrollAnimation url={url} onReroll={onReroll} />;
  }

  return <MobileScrollAnimation url={url} onReroll={onReroll} />;
}

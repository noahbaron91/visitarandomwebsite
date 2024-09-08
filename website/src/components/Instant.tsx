import { useEffect } from 'react';
import { useURL } from '../hooks/useURL';
import { Spinner } from './Spinner';
import { usePageContext } from '../context/PageContext';

export function Instant() {
  const url = useURL();
  const { setPage } = usePageContext();

  useEffect(() => {
    if (!url) return;

    window.open(url, '_blank');
    setPage('home');
  }, [url]);

  if (!url) {
    return (
      <div className='fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Spinner />
      </div>
    );
  }

  return null;
}

import { useEffect, useRef, useState } from 'react';
import { useVisitedDomains } from '../context/VisitedDomains';

async function getURL(visitedDomains: string[]) {
  try {
    const result = await fetch('/api/v1/page', {
      method: 'PUT',
      body: JSON.stringify({ visitedDomains }),
    });

    if (!result.ok) {
      throw new Error('Failed to fetch URL');
    }

    const data = await result.json();
    return data.url;
  } catch (error) {
    // Retry after 1 second
    const oneSecondWait = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    await oneSecondWait;

    return await getURL(visitedDomains);
  }
}

const getURLHostName = (url: string): string | null => {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
};

export const useURL = () => {
  const [url, setURL] = useState<null | string>(null);
  const { addVisitedDomain, visitedDomains } = useVisitedDomains();

  const hasRequestedURL = useRef(false);

  useEffect(() => {
    if (hasRequestedURL.current) return;

    hasRequestedURL.current = true;

    getURL(visitedDomains).then((url) => {
      setURL(url);

      if (url) {
        const hostname = getURLHostName(url);

        if (!hostname) return;

        addVisitedDomain(hostname);
      }
    });
  }, [visitedDomains]);

  return url;
};

import { useEffect, useState } from 'react';

async function getURL() {
  try {
    const result = await fetch('/api/v1/page');

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

    return await getURL();
  }
}

export const useURL = () => {
  const [url, setURL] = useState<null | string>(null);

  useEffect(() => {
    getURL().then((url) => {
      setURL(url);
    });
  }, []);

  return url;
};

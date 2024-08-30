import { useEffect, useState } from 'react';

function ChevronRight() {
  return (
    <svg
      width='17'
      height='33'
      viewBox='0 0 17 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.4736 16.5L0.368359 32.0885L0.368359 0.911543L16.4736 16.5Z'
        fill='#C580FC'
      />
    </svg>
  );
}

async function getURL() {
  try {
    const page = await fetch('/api/v1/page');
    const data = await page.json();
    return data.url;
  } catch (error) {
    // TODO: retry automatically
    // wait 5 seconds
  }
}

export function FindURL() {
  const [url, setURL] = useState<null | string>(null);

  useEffect(() => {
    try {
      getURL().then((url) => {
        setURL(url);
      });
    } catch (error) {}
  }, []);

  return (
    <div className='fixed top-1/2 -translate-y-1/2 flex flex-col gap-5 w-full'>
      <h3 className='text-4xl text-white font-bold text-center'>
        Searching URLS...
      </h3>
      <div className=' flex ml-16 items-center gap-12 mx-7 text-3xl'>
        <ChevronRight />
        <div className='flex text-lg gap-3 flex-col text-white relative'>
          <div
            className='absolute top-0 left-0 right-0 bottom-0'
            style={{
              background:
                'linear-gradient(black, transparent 25%), linear-gradient(0deg, black, transparent 25%)',
            }}
          />
          <p className='text-3xl'>google.com</p>
          <p className='text-3xl'>thisisit.com</p>
          <p className='text-3xl'>coursera.org</p>
          <p className='text-3xl'>google.com</p>
          <p className='text-3xl text-[#C580FC]'>thisisit.com</p>
          <p className='text-3xl'>coursera.org</p>
          <p className='text-3xl'>coursera.org</p>
          <p className='text-3xl'>coursera.org</p>
          <p className='text-3xl'>coursera.org</p>
        </div>
      </div>
    </div>
  );
}

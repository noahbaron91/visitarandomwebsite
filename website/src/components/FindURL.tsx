import { useEffect, useState } from 'react';
import { usePageContext } from '../context/page';

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

function ExternalLink() {
  return (
    <svg
      width='18'
      height='19'
      viewBox='0 0 18 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.81903 2L7.5 2C7.91421 2 8.25 2.33579 8.25 2.75C8.25 3.16421 7.91421 3.5 7.5 3.5H5.85C5.20757 3.5 4.77085 3.50058 4.43328 3.52816C4.10447 3.55503 3.93631 3.60372 3.81901 3.66349C3.53677 3.8073 3.3073 4.03677 3.16349 4.31901C3.10372 4.43631 3.05503 4.60447 3.02816 4.93328C3.00058 5.27085 3 5.70757 3 6.35V12.65C3 13.2924 3.00058 13.7292 3.02816 14.0667C3.05503 14.3955 3.10372 14.5637 3.16349 14.681C3.3073 14.9632 3.53677 15.1927 3.81902 15.3365C3.93631 15.3963 4.10447 15.445 4.43328 15.4718C4.77085 15.4994 5.20757 15.5 5.85 15.5H12.15C12.7924 15.5 13.2292 15.4994 13.5667 15.4718C13.8955 15.445 14.0637 15.3963 14.181 15.3365C14.4632 15.1927 14.6927 14.9632 14.8365 14.681C14.8963 14.5637 14.945 14.3955 14.9718 14.0667C14.9994 13.7292 15 13.2924 15 12.65V11C15 10.5858 15.3358 10.25 15.75 10.25C16.1642 10.25 16.5 10.5858 16.5 11V12.681C16.5 13.2847 16.5 13.783 16.4669 14.1889C16.4324 14.6104 16.3585 14.998 16.173 15.362C15.8854 15.9265 15.4265 16.3854 14.862 16.673C14.498 16.8585 14.1104 16.9324 13.6889 16.9669C13.283 17 12.7847 17 12.181 17H5.81901C5.21529 17 4.71702 17 4.31113 16.9669C3.88956 16.9324 3.50203 16.8585 3.13803 16.673C2.57354 16.3854 2.1146 15.9265 1.82698 15.362C1.64151 14.998 1.56759 14.6104 1.53315 14.1889C1.49998 13.783 1.49999 13.2847 1.5 12.681V6.31903C1.49999 5.7153 1.49998 5.21703 1.53315 4.81113C1.56759 4.38956 1.64151 4.00203 1.82698 3.63803C2.1146 3.07354 2.57354 2.6146 3.13803 2.32698C3.50203 2.14151 3.88956 2.06759 4.31113 2.03315C4.71703 1.99998 5.2153 1.99999 5.81903 2ZM10.5 2.75001C10.5 2.33579 10.8358 2.00001 11.25 2.00001H15.75C16.1642 2.00001 16.5 2.33579 16.5 2.75001L16.5 7.25001C16.5 7.66422 16.1642 8.00001 15.75 8.00001C15.3358 8.00001 15 7.66422 15 7.25001L15 4.56067L9.53033 10.0303C9.23744 10.3232 8.76256 10.3232 8.46967 10.0303C8.17678 9.73744 8.17678 9.26256 8.46967 8.96967L13.9393 3.50001H11.25C10.8358 3.50001 10.5 3.16422 10.5 2.75001Z'
        fill='#78716C'
      />
    </svg>
  );
}

function RerollLink() {
  return (
    <svg
      width='18'
      height='19'
      viewBox='0 0 18 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.53033 2.21967C6.82322 2.51256 6.82322 2.98744 6.53033 3.28033L4.81066 5H10.5C13.3995 5 15.75 7.35051 15.75 10.25C15.75 13.1495 13.3995 15.5 10.5 15.5H3C2.58579 15.5 2.25 15.1642 2.25 14.75C2.25 14.3358 2.58579 14 3 14H10.5C12.5711 14 14.25 12.3211 14.25 10.25C14.25 8.17893 12.5711 6.5 10.5 6.5H4.81066L6.53033 8.21967C6.82322 8.51256 6.82322 8.98744 6.53033 9.28033C6.23744 9.57322 5.76256 9.57322 5.46967 9.28033L2.46967 6.28033C2.17678 5.98744 2.17678 5.51256 2.46967 5.21967L5.46967 2.21967C5.76256 1.92678 6.23744 1.92678 6.53033 2.21967Z'
        fill='#78716C'
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
  const [hasFoundLink, setHasFoundLink] = useState(true);
  const { setPage } = usePageContext();

  useEffect(() => {
    try {
      getURL().then((url) => {
        setURL(url);
      });
    } catch (error) {}
  }, []);

  if (hasFoundLink) {
    return (
      <div className='fixed top-1/2 -translate-y-1/2 flex flex-col gap-5 w-full'>
        <div className='mx-6 flex flex-col gap-4'>
          <div>
            <p className='text-gray-600'>https://example.com/path-1/slug</p>
            <h3 className='text-4xl text-white font-bold'>
              Finding you the perfect link
            </h3>
          </div>
          <div className='flex flex-col gap-2'>
            <a
              type='button'
              className='flex items-center justify-between px-6 py-3 rounded bg-gray-900 border border-gray-700'
              href='https://example.com'
              target='_blank'
            >
              Visit website
              <ExternalLink />
            </a>
            <button
              type='button'
              className='flex items-center justify-between rounded px-6 py-3 bg-gray-900 border border-gray-700'
            >
              Reroll
              <RerollLink />
            </button>
          </div>
        </div>
        <div className=' flex ml-12 items-center gap-12 mx-7 text-3xl'>
          <ChevronRight />
          <div className='max-h-96 overflow-clip flex text-lg gap-3 flex-col text-white relative'>
            <div
              className='absolute top-0 left-0 right-0 bottom-0'
              style={{
                background:
                  'linear-gradient(black, transparent 25%), linear-gradient(0deg, black, transparent 25%)',
              }}
            />
            <div className='flex flex-col' style={{ marginTop: -150 }}>
              <p className='text-3xl'>google.com</p>
              <p className='text-3xl'>thisisit.com</p>
              <p className='text-3xl'>coursera.org</p>
              <p className='text-3xl'>google.com</p>
              <p className='text-3xl text-[#C580FC]'>thisisit.com</p>
              <p className='text-3xl'>coursera.org</p>
              <p className='text-3xl'>coursera.org</p>
              <p className='text-3xl'>coursera.org</p>
              <p className='text-3xl'>coursera.org</p>
              <p className='text-3xl'>coursera.org</p>
              <p className='text-3xl'>coursera.org</p>
              <p className='text-3xl'>coursera.org</p>
              <p className='text-3xl'>coursera.org</p>
              <p className='text-3xl'>coursera.org</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed top-1/2 -translate-y-1/2 flex flex-col gap-5 w-full'>
      <h3 className='text-4xl text-white mx-6 font-bold text-center'>
        Finding you the perfect link<span>.</span>
        <span>.</span>
        <span>.</span>
      </h3>
      <div className=' flex ml-16 items-center gap-12 mx-7 text-3xl'>
        <ChevronRight />
        <div className='max-h-96 overflow-clip flex text-lg gap-3 flex-col text-white relative'>
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
          <p className='text-3xl'>coursera.org</p>
          <p className='text-3xl'>coursera.org</p>
          <p className='text-3xl'>coursera.org</p>
          <p className='text-3xl'>coursera.org</p>
          <p className='text-3xl'>coursera.org</p>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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

function ScrollAnimation({
  url,
  // onComplete,
  // isComplete,
}: {
  url: string;
  // isComplete: boolean;
  // onComplete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLParagraphElement>(null);
  const tickerWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !targetRef.current) return;

    const tickerMarker = document.getElementById('ticker-marker');
    const tickerWrapper = document.getElementById('ticker-wrapper');

    if (tickerMarker === null || tickerWrapper === null) return;

    const tickerMarkerTop = tickerMarker.getBoundingClientRect().top;
    const tickerWrapperTop = tickerWrapper.getBoundingClientRect().top;

    const topPositionDifference = tickerMarkerTop - tickerWrapperTop;

    const scrollToPosition =
      targetRef.current.offsetTop - topPositionDifference;

    gsap.to(ref.current, {
      scrollTo: scrollToPosition,
      // duration: 15,
      duration: 2,
      ease: 'power3.out',
      delay: 0.25,
      onComplete: () => {
        const FADE_OUT_DURATION = 1.5;

        gsap.to('.fade-out', {
          opacity: 0,
          duration: FADE_OUT_DURATION,
          ease: 'expo.out',
        });

        gsap.to(ref.current, {
          delay: FADE_OUT_DURATION - 0.5,
          // duration: FADE_OUT_DURATION - 0.5,
          // x: -100,
        });
      },
    });
  }, []);

  return (
    <div className='relative'>
      <div
        className='fade-out absolute top-0 left-0 right-0 bottom-0 z-10'
        id='ticker-wrapper'
        style={{
          background:
            'linear-gradient(black, transparent 25%), linear-gradient(0deg, black, transparent 25%)',
        }}
      />
      <div
        ref={ref}
        className='hide-scrollbar max-h-96 overflow-scroll flex text-lg gap-3 flex-col text-white relative'
      >
        <p className='fade-out text-3xl'>google.com</p>
        <p className='fade-out text-3xl'>thisisit.com</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>google.com</p>
        <p className='fade-out text-3xl'>thisisit.com</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='text-3xl' ref={targetRef}>
          {url}
        </p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
        <p className='fade-out text-3xl'>coursera.org</p>
      </div>
      {/* <div className='visit-website flex-col items-center'>
        <a
          href={url}
          target='_blank'
          className='justify-between px-6 flex-1 flex items-center h-12 bg-gray-900 border border-gray-700 border-solid rounded'
        >
          Visit website
          <ExternalLink />
        </a>
        <button
          className='justify-between flex flex-1 h-12 px-6 items-center bg-gray-900 border border-gray-700 border-solid rounded'
          type='button'
        >
          Reroll
          <RerollLink />
        </button>
      </div> */}
    </div>
  );
}

const useURL = () => {
  const [url, setURL] = useState<null | string>(null);

  useEffect(() => {
    getURL().then((url) => {
      setURL(url);
    });
  }, []);

  return url;
};

function Spinner() {
  return (
    <div className='animate-spin w-11 h-11 border-4 border-solid border-white border-b-transparent rounded-[50%]'></div>
  );
}

export function FindURL() {
  const [hasFoundLink, setHasFoundLink] = useState(false);

  const url = useURL();
  const urlWithoutProtocol = url?.replace(/(^\w+:|^)\/\//, '');

  if (!urlWithoutProtocol || !url) {
    return (
      <div className='fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='fixed top-1/2 -translate-y-1/2 flex flex-col gap-5 w-full'>
      <h3 className='fade-out text-4xl text-white mx-6 font-bold text-center z-10'>
        <span>Finding you the perfect link</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </h3>
      <div className='flex items-center gap-8 mx-auto text-3xl'>
        <div className='fade-out' id='ticker-marker'>
          <ChevronRight />
        </div>
        <ScrollAnimation
          // isComplete={hasFoundLink}
          url={urlWithoutProtocol}
          // onComplete={() => setHasFoundLink(true)}
        />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

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
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.81903 1.5L7.5 1.5C7.91421 1.5 8.25 1.83579 8.25 2.25C8.25 2.66421 7.91421 3 7.5 3H5.85C5.20757 3 4.77085 3.00058 4.43328 3.02816C4.10447 3.05503 3.93631 3.10372 3.81901 3.16349C3.53677 3.3073 3.3073 3.53677 3.16349 3.81901C3.10372 3.93631 3.05503 4.10447 3.02816 4.43328C3.00058 4.77085 3 5.20757 3 5.85V12.15C3 12.7924 3.00058 13.2292 3.02816 13.5667C3.05503 13.8955 3.10372 14.0637 3.16349 14.181C3.3073 14.4632 3.53677 14.6927 3.81902 14.8365C3.93631 14.8963 4.10447 14.945 4.43328 14.9718C4.77085 14.9994 5.20757 15 5.85 15H12.15C12.7924 15 13.2292 14.9994 13.5667 14.9718C13.8955 14.945 14.0637 14.8963 14.181 14.8365C14.4632 14.6927 14.6927 14.4632 14.8365 14.181C14.8963 14.0637 14.945 13.8955 14.9718 13.5667C14.9994 13.2292 15 12.7924 15 12.15V10.5C15 10.0858 15.3358 9.75 15.75 9.75C16.1642 9.75 16.5 10.0858 16.5 10.5V12.181C16.5 12.7847 16.5 13.283 16.4669 13.6889C16.4324 14.1104 16.3585 14.498 16.173 14.862C15.8854 15.4265 15.4265 15.8854 14.862 16.173C14.498 16.3585 14.1104 16.4324 13.6889 16.4669C13.283 16.5 12.7847 16.5 12.181 16.5H5.81901C5.21529 16.5 4.71702 16.5 4.31113 16.4669C3.88956 16.4324 3.50203 16.3585 3.13803 16.173C2.57354 15.8854 2.1146 15.4265 1.82698 14.862C1.64151 14.498 1.56759 14.1104 1.53315 13.6889C1.49998 13.283 1.49999 12.7847 1.5 12.181V5.81903C1.49999 5.2153 1.49998 4.71703 1.53315 4.31113C1.56759 3.88956 1.64151 3.50203 1.82698 3.13803C2.1146 2.57354 2.57354 2.1146 3.13803 1.82698C3.50203 1.64151 3.88956 1.56759 4.31113 1.53315C4.71703 1.49998 5.2153 1.49999 5.81903 1.5ZM10.5 2.25001C10.5 1.83579 10.8358 1.50001 11.25 1.50001H15.75C16.1642 1.50001 16.5 1.83579 16.5 2.25001L16.5 6.75001C16.5 7.16422 16.1642 7.50001 15.75 7.50001C15.3358 7.50001 15 7.16422 15 6.75001L15 4.06067L9.53033 9.53033C9.23744 9.82322 8.76256 9.82322 8.46967 9.53033C8.17678 9.23744 8.17678 8.76256 8.46967 8.46967L13.9393 3.00001H11.25C10.8358 3.00001 10.5 2.66422 10.5 2.25001Z'
        fill='#FAFAF9'
      />
    </svg>
  );
}

function Reroll() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.53033 1.71967C6.82322 2.01256 6.82322 2.48744 6.53033 2.78033L4.81066 4.5H10.5C13.3995 4.5 15.75 6.85051 15.75 9.75C15.75 12.6495 13.3995 15 10.5 15H3C2.58579 15 2.25 14.6642 2.25 14.25C2.25 13.8358 2.58579 13.5 3 13.5H10.5C12.5711 13.5 14.25 11.8211 14.25 9.75C14.25 7.67893 12.5711 6 10.5 6H4.81066L6.53033 7.71967C6.82322 8.01256 6.82322 8.48744 6.53033 8.78033C6.23744 9.07322 5.76256 9.07322 5.46967 8.78033L2.46967 5.78033C2.17678 5.48744 2.17678 5.01256 2.46967 4.71967L5.46967 1.71967C5.76256 1.42678 6.23744 1.42678 6.53033 1.71967Z'
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

{
  /* <div className='flex flex-col'> */
}

{
  /* <a
            href='https://example.com'
            className='bg-[#8500EF] rounded flex items-center justify-between px-6 py-4'
          >
            Visit website
            <ExternalLink />
          </a>
          <button className='bg-gray-900 border border-gray-700 rounded flex items-center  justify-between px-6 py-4'>
            Visit website
            <ExternalLink />
          </button>
        </div> */
}
{
  /* <div className='visit-website flex-col items-center'>
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
        </div> */
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
  const buttonsRef = useRef<HTMLDivElement>(null);

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
          onComplete: () => {
            if (targetRef.current && ref.current && buttonsRef.current) {
              const state = Flip.getState(targetRef.current);
              targetRef.current.style.left = '36px';
              targetRef.current.style.right = '0px';
              targetRef.current.style.top = '64px';
              targetRef.current.style.paddingRight = '36px';
              targetRef.current.style.position = 'fixed';
              Flip.from(state, {
                duration: 2,
                ease: 'power1.out',
                onComplete: () => {
                  gsap.to(buttonsRef.current, {
                    opacity: 1,
                    duration: FADE_OUT_DURATION,
                    ease: 'expo.out',
                    onComplete: () => {
                      const state = Flip.getState('.fade-in');

                      document
                        .querySelectorAll('.fade-in')
                        .forEach((element) => {
                          console.log(element);
                          (element as HTMLDivElement).style.display = 'flex';
                        });

                      Flip.from(state);
                    },
                  });
                },
              });
            }
          },
        });

        // gsap.to(ref.current, {
        //   delay: FADE_OUT_DURATION - 0.5,
        //   left: 25,
        //   // duration: FADE_OUT_DURATION - 0.5,
        //   // x: -100,
        // });
      },
    });
  }, []);

  return (
    <>
      <div className='flex items-center gap-8 mx-auto text-3xl'>
        <div className='fade-out' id='ticker-marker'>
          <ChevronRight />
        </div>
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
            <p className='fade-out text-3xl'>coursera.org</p>
            <p className='fade-out text-3xl'>coursera.org</p>
            <p className='fade-out text-3xl'>coursera.org</p>
            <p className='fade-out text-3xl'>coursera.org</p>
            <p className='fade-out text-3xl'>coursera.org</p>
            <p className='fade-out text-3xl'>coursera.org</p>
            <p className='fade-out text-3xl'>coursera.org</p>
            <div className='flex flex-col w-full gap-4' ref={targetRef}>
              <p className='text-3xl'>{url}</p>
              <div className='fade-in flex-col gap-2 w-full pr-[36px]'>
                <a
                  href={url}
                  target='_blank'
                  className='flex px-6 bg-[#8500EF] text-lg border border-[#BF6FFE] py-3 rounded justify-between items-center'
                >
                  Visit website <ExternalLink />
                </a>
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className='flex w-full border bg-gray-900 text-lg border-gray-700 rounded px-6 py-3 justify-between items-center'
                >
                  Reroll <Reroll />
                </button>
              </div>
            </div>
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
          </div>
        </div>

        <div
          className='flex flex-col gap-2 w-full absolute left-0 right-0 px-12 opacity-0'
          ref={buttonsRef}
        ></div>
      </div>
    </>
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

      <ScrollAnimation
        // isComplete={hasFoundLink}
        url={urlWithoutProtocol}
        // onComplete={() => setHasFoundLink(true)}
      />
    </div>
  );
}

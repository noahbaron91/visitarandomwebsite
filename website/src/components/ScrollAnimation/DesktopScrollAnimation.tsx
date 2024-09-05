import { useEffect, useRef } from 'react';
import * as i from '../Icons';
import { TextWheelElement } from './TextWheelElement';
import { VisitWebsiteWarning } from '../VisitWebsiteWarning';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin, CustomEase);

export function DesktopScrollAnimation({
  onReroll,
  url,
}: {
  onReroll: () => void;
  url: string;
}) {
  const urlWithoutWWW = url.replace('www.', '');
  const urlWithoutProtocol = urlWithoutWWW.replace(/(^\w+:|^)\/\//, '');
  const domain = urlWithoutProtocol.split('/')[0];

  const targetRef = useRef<HTMLDivElement>(null);

  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to('#wrapper', {
      opacity: 1,
      duration: 1,
    });

    if (!wheelRef.current || !targetRef.current) return;

    const tickerMarker = document.getElementById('ticker-marker');
    const tickerWrapper = document.getElementById('ticker-wrapper');

    if (tickerMarker === null || tickerWrapper === null) return;

    const tickerMarkerTop = tickerMarker.getBoundingClientRect().top;
    const tickerWrapperTop = tickerWrapper.getBoundingClientRect().top;

    const topPositionDifference = tickerMarkerTop - tickerWrapperTop;

    const scrollToPosition =
      targetRef.current.offsetTop - topPositionDifference;

    gsap.to(wheelRef.current, {
      scrollTo: scrollToPosition,
      duration: 10,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0.126,0.382 0.168,0.674 0.326,0.822 0.518,1.002 0.95,1.005 1,1'
      ),
      delay: 0,
      onComplete: () => {
        gsap.to(targetRef.current, {
          color: '#C580FC',
          duration: 1,
        });

        const searchingLinksText = document.getElementById('searching-links');
        if (!searchingLinksText) return;

        gsap.to(searchingLinksText, {
          opacity: 0,
          delay: 0.25,
          duration: 1,
          onComplete: () => {
            searchingLinksText.style.display = 'none';
            const elements = document.querySelectorAll('.found-link');
            elements.forEach((element) => {
              element.classList.remove('found-link');
            });
            gsap.to(elements, {
              opacity: 1,
              duration: 1,
            });
          },
        });
      },
    });
  }, [targetRef.current, wheelRef.current]);

  const handleReroll = () => {
    gsap.to('#wrapper', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        onReroll();
      },
    });
  };

  return (
    <div
      id='wrapper'
      className='opacity-0 flex w-screen justify-center gap-5 xl:gap-28 fixed top-1/2 -translate-y-1/2'
    >
      <div
        id='text-wrapper'
        className='flex items-left gap-6 w-[480px] justify-center flex-col'
      >
        <h1 id='searching-links' className='text-5xl'>
          Searching links...
        </h1>
        <div className='flex flex-col gap-2 found-link opacity-0'>
          <h1 className='text-4xl'>Found the perfect link</h1>
          <p
            className='text-2xl text-ellipsis overflow-clip text-nowrap'
            style={{ color: '#A8A29E' }}
          >
            {urlWithoutProtocol}
          </p>
        </div>
        <div className='flex flex-col gap-3 found-link opacity-0'>
          <VisitWebsiteWarning
            url={url}
            className='text-lg rounded-lg justify-between items-center py-4 px-9 flex w-[450px] bg-[#8500EF] border border-[#BF6FFE] border-solid'
          />
          <button
            onClick={handleReroll}
            className='text-lg px-9 py-4 rounded-lg flex w-[450px] bg-gray-900 border border-gray-700 justify-between items-center'
          >
            Reroll <i.Reroll />
          </button>
        </div>
      </div>
      <div className='flex items-center gap-12 text-3xl'>
        <div className='fade-out' id='ticker-marker'>
          <i.ChevronRight scale={1.15} />
        </div>
        <div className='relative'>
          <div
            className='fade-out absolute top-0 pointer-events-none left-0 right-0 bottom-0 z-10'
            id='ticker-wrapper'
            style={{
              background:
                'linear-gradient(black, transparent 25%), linear-gradient(0deg, black, transparent 25%)',
            }}
          />
          <div
            ref={wheelRef}
            className='hide-scrollbar max-h-screen overflow-scroll flex text-lg gap-6 flex-col text-white relative md:max-w-[350px] xl:max-w-[500px]'
          >
            {Array.from({ length: 250 }).map((_, index) => (
              <TextWheelElement
                className='text-4xl overflow-ellipsis text-nowrap overflow-clip pointer-events-none select-none'
                key={index}
              />
            ))}
            <div className='flex flex-col w-full gap-4' ref={targetRef}>
              <p className='overflow-ellipsis text-nowrap overflow-clip text-4xl pointer-events-none select-none'>
                {domain}
              </p>
            </div>
            {Array.from({ length: 25 }).map((_, index) => (
              <TextWheelElement
                className='text-4xl overflow-ellipsis text-nowrap overflow-clip pointer-events-none select-none'
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

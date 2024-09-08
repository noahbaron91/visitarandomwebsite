import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as i from '../Icons';
import { TextWheelElement } from './TextWheelElement';
import { VisitWebsiteWarning } from '../VisitWebsiteWarning';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { CustomEase } from 'gsap/all';
import { fadeInAnimation, scrollWheelAnimation } from '../../animations';
import { calculateScrollToPosition } from '../../utils';

gsap.registerPlugin(ScrollToPlugin, CustomEase);

const hideSearchingLinksTextAnimation = (
  searchingLinksText: HTMLHeadingElement
) => {
  const promise = new Promise((resolve) => {
    gsap.to(searchingLinksText, {
      opacity: 0,
      delay: 0.25,
      duration: 1,
      onComplete: (cb) => {
        searchingLinksText.style.display = 'none';
        resolve(cb);
      },
    });
  });

  return promise;
};

const highlightTextAnimation = (target: HTMLDivElement) => {
  gsap.to(target, {
    color: '#C580FC',
    duration: 1,
  });
};

const fadeInFoundLinkAnimation = () => {
  const elements = document.querySelectorAll('.found-link');

  elements.forEach((element) => {
    element.classList.remove('found-link');
  });

  gsap.to(elements, {
    opacity: 1,
    duration: 1,
  });
};

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchingLinksTextRef = useRef<HTMLHeadingElement>(null);

  const hasAnimationStarted = useRef(false);

  const animate = useCallback(async () => {
    if (hasAnimationStarted.current) return;

    const wheel = wheelRef.current;
    const searchingLinksText = searchingLinksTextRef.current;
    const target = targetRef.current;
    const wrapper = wrapperRef.current;

    if (!searchingLinksText || !wheel || !target || !wrapper) return;

    hasAnimationStarted.current = true;

    // Some animations we want to run in parallel so we don't have to wait for them to finish
    fadeInAnimation(wrapper);

    const scrollToPosition = calculateScrollToPosition(targetRef);
    await scrollWheelAnimation(wheel, scrollToPosition);

    highlightTextAnimation(target);

    await hideSearchingLinksTextAnimation(searchingLinksText);

    fadeInFoundLinkAnimation();
  }, []);

  useEffect(() => {
    animate();
  }, [animate]);

  const handleReroll = () => {
    gsap.to(wrapperRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: onReroll,
    });
  };

  const wheelBackgroundStyle = useMemo(
    () => ({
      background:
        'linear-gradient(black, transparent 25%), linear-gradient(0deg, black, transparent 25%)',
    }),
    []
  );

  return (
    <div
      ref={wrapperRef}
      className='opacity-0 flex w-screen justify-center gap-5 xl:gap-28 fixed top-1/2 -translate-y-1/2'
    >
      <div className='flex items-left gap-6 w-[480px] justify-center flex-col'>
        <h1 ref={searchingLinksTextRef} className='text-5xl'>
          Searching links...
        </h1>
        <div className='flex flex-col gap-2 found-link opacity-0'>
          <h1 className='text-4xl'>Found the perfect link</h1>
          <p className='text-2xl text-[#A8A29E] text-ellipsis overflow-clip text-wrap line-clamp-2 break-all'>
            {urlWithoutProtocol}
          </p>
        </div>
        <div className='flex flex-col gap-3 found-link opacity-0'>
          <VisitWebsiteWarning
            url={url}
            className='text-lg rounded-lg justify-between items-center py-4 px-9 flex w-[450px] bg-secondary border border-[#BF6FFE] border-solid'
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
            style={wheelBackgroundStyle}
          />
          <div
            ref={wheelRef}
            className='hide-scrollbar max-h-screen overflow-scroll flex text-lg gap-6 flex-col text-white relative md:max-w-[350px] xl:max-w-[500px]'
          >
            {Array.from({ length: 250 }).map((_, index) => (
              <TextWheelElement
                className='text-4xl overflow-ellipsis text-nowrap overflow-clip pointer-events-none select-none flex-shrink-0'
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
                className='text-4xl overflow-ellipsis text-nowrap overflow-clip pointer-events-none select-none flex-shrink-0'
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

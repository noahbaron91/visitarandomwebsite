import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  calculateScrollToPosition,
  generateRandomNumber,
  getRandomArrayElement,
} from '../../utils';
import { SEARCHING_TEXT } from '../../constants';
import { TextWheelElement } from './TextWheelElement';
import { VisitWebsiteWarning } from '../VisitWebsiteWarning';
import * as i from '../Icons';
import {
  fadeInAnimation,
  fadeInButtonsAnimation,
  moveDomainAnimation,
  scrollWheelAnimation,
} from '../../animations';

type Props = {
  url: string;
  onReroll: () => void;
};

const fadeOutWheelAnimation = () => {
  gsap.to('.fade-out', {
    opacity: 0,
    delay: 0.25,
    duration: 1,
    ease: 'expo.out',
  });
};

export function MobileScrollAnimation({ url, onReroll }: Props) {
  const urlWithoutWWW = url.replace('www.', '');
  const urlWithoutProtocol = urlWithoutWWW.replace(/(^\w+:|^)\/\//, '');
  const domain = urlWithoutProtocol.split('/')[0];

  const [searchText] = useState(getRandomArrayElement(SEARCHING_TEXT));
  const [randomNumberOfTextElements] = useState(generateRandomNumber(250, 300));

  const wheelRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLParagraphElement>(null);
  const actionButtonsRef = useRef<HTMLDivElement>(null);
  const domainRef = useRef<HTMLParagraphElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasAnimationStarted = useRef(false);

  const animation = useCallback(async () => {
    if (hasAnimationStarted.current) return;

    const wrapper = wrapperRef.current;
    const domain = domainRef.current;
    const wheel = wheelRef.current;
    const target = targetRef.current;
    const actionButtons = actionButtonsRef.current;

    if (!wrapper || !domain || !wheel || !target || !actionButtons) return;

    hasAnimationStarted.current = true;

    fadeInAnimation(wrapper);

    const scrollToPosition = calculateScrollToPosition(targetRef);
    await scrollWheelAnimation(wheelRef.current, scrollToPosition);

    fadeOutWheelAnimation();

    setTimeout(async () => {
      await moveDomainAnimation(target);

      fadeInButtonsAnimation(actionButtons);
    }, 1250);
  }, []);

  useEffect(() => {
    animation();
  }, [animation]);

  const handleReroll = () => {
    gsap.to(wrapperRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        onReroll();
      },
    });
  };

  const backgroundCarouselStyle: React.CSSProperties = useMemo(
    () => ({
      background:
        'linear-gradient(black, transparent 25%), linear-gradient(0deg, black, transparent 25%)',
    }),
    []
  );

  return (
    <>
      <div
        ref={wrapperRef}
        className='fixed opacity-0 top-1/2 -translate-y-1/2 flex flex-col gap-5 w-full'
      >
        <h3 className='fade-out text-3xl text-white mx-8 font-bold text-center z-10'>
          <span>{searchText}</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h3>
        <div className='flex items-center gap-8 mx-auto text-3xl'>
          <div className='fade-out' id='ticker-marker'>
            <i.ChevronRight scale={1} />
          </div>
          <div className='relative'>
            <div
              className='fade-out absolute top-0 pointer-events-none left-0 right-0 bottom-0 z-10'
              id='ticker-wrapper'
              style={backgroundCarouselStyle}
            />
            <div
              ref={wheelRef}
              className='hide-scrollbar max-h-96 overflow-scroll flex text-lg gap-3 flex-col text-white relative max-w-[200px] min-[480px]:max-w-[280px] sm:max-w-[360px]'
            >
              {Array.from({ length: randomNumberOfTextElements }).map(
                (_, index) => (
                  <TextWheelElement
                    key={index}
                    className='fade-out text-3xl pointer-events-none select-none flex-shrink-0 overflow-x-hidden text-ellipsis'
                  />
                )
              )}
              <div
                className='flex flex-col w-full gap-4 max-w-[90vw]'
                ref={targetRef}
              >
                <p
                  ref={domainRef}
                  className='text-3xl text-ellipsis overflow-clip text-wrap line-clamp-1 break-all'
                >
                  <span>{domain}</span>
                </p>
                <div
                  ref={actionButtonsRef}
                  className='hidden left-0 opacity-0 flex-col gap-2 w-full'
                >
                  <VisitWebsiteWarning
                    url={url}
                    className='flex px-6 bg-secondary text-lg border border-[#BF6FFE] py-3 rounded justify-between items-center'
                  />
                  <button
                    onClick={handleReroll}
                    className='flex w-full border bg-gray-900 text-lg border-gray-700 rounded px-6 py-3 justify-between items-center'
                  >
                    Reroll <i.Reroll />
                  </button>
                </div>
              </div>
              {Array.from({ length: 20 }).map((_, index) => (
                <TextWheelElement
                  key={index}
                  className='fade-out text-3xl pointer-events-none select-none flex-shrink-0 overflow-x-hidden text-ellipsis'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

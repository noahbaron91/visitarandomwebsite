import { useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/all';
import {
  calculateSrcollToPosition,
  generateRandomNumber,
  getRandomArrayElement,
} from '../../utils';
import { SEARCHING_TEXT } from '../../constants';
import { TextWheelElement } from './TextWheelElement';
import { VisitWebsiteWarning } from '../VisitWebsiteWarning';
import * as i from '../Icons';

type Props = {
  url: string;
  onReroll: () => void;
};

export function MobileScrollAnimation({ url, onReroll }: Props) {
  const urlWithoutWWW = url.replace('www.', '');
  const urlWithoutProtocol = urlWithoutWWW.replace(/(^\w+:|^)\/\//, '');
  const domain = urlWithoutProtocol.split('/')[0];

  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLParagraphElement>(null);

  const [searchText] = useState(getRandomArrayElement(SEARCHING_TEXT));
  const [randomNumberOfTextElements] = useState(generateRandomNumber(250, 300));

  useEffect(() => {
    if (!ref.current || !targetRef.current) return;

    gsap.to('#wrapper', {
      opacity: 1,
      duration: 1,
    });

    const scrollToPosition = calculateSrcollToPosition(targetRef);

    gsap.to(ref.current, {
      scrollTo: scrollToPosition,
      duration: 10,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0.126,0.382 0.168,0.674 0.326,0.822 0.518,1.002 0.95,1.005 1,1'
      ),
      delay: 0,
      onComplete: () => {
        const textElement = document.getElementById('target-domain');

        gsap.to('.fade-out', {
          opacity: 0,
          delay: 0.25,
          duration: 1,
          ease: 'expo.out',
        });

        setTimeout(() => {
          if (targetRef.current && ref.current) {
            const state = Flip.getState(targetRef.current);
            targetRef.current.style.left = '36px';
            targetRef.current.style.right = '0px';
            targetRef.current.style.top = '64px';
            targetRef.current.style.paddingRight = '36px';
            targetRef.current.style.position = 'fixed';

            Flip.from(state, {
              duration: 1,
              ease: 'power1.out',
              onComplete: () => {
                gsap.to(textElement, {
                  text: urlWithoutProtocol,
                  ease: 'power1.inOut',
                  duration: 1,
                });
              },
            });
          }
        }, 1250);

        setTimeout(() => {
          document.querySelectorAll('.fade-in').forEach((element) => {
            (element as HTMLDivElement).style.display = 'flex';
          });
          gsap.to('.fade-in', {
            opacity: 1.5,
            duration: 1,
            ease: 'power1.inOut',
          });
        }, 1250 + 750);
      },
    });
  }, [ref.current, targetRef.current]);

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
    <>
      <div
        id='wrapper'
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
              style={{
                background:
                  'linear-gradient(black, transparent 25%), linear-gradient(0deg, black, transparent 25%)',
              }}
            />
            <div
              ref={ref}
              className='hide-scrollbar max-h-96 overflow-scroll flex text-lg gap-3 flex-col text-white relative max-w-[280px]'
            >
              {Array.from({ length: randomNumberOfTextElements }).map(
                (_, index) => (
                  <TextWheelElement
                    key={index}
                    className='fade-out text-3xl pointer-events-none select-none'
                  />
                )
              )}
              <div
                className='flex flex-col w-full gap-4 max-w-[90vw]'
                ref={targetRef}
              >
                <p
                  id='target-domain'
                  className='text-3xl text-ellipsis overflow-clip text-nowrap'
                >
                  {domain}
                </p>
              </div>
              {Array.from({ length: 20 }).map((_, index) => (
                <TextWheelElement
                  key={index}
                  className='fade-out text-3xl pointer-events-none select-none'
                />
              ))}
            </div>
          </div>
        </div>

        <div className='fixed top-[calc(64px_+_54px)] left-0 opacity-0 fade-in flex-col gap-2 w-full px-9'>
          <VisitWebsiteWarning
            url={url}
            className='flex px-6 bg-[#8500EF] text-lg border border-[#BF6FFE] py-3 rounded justify-between items-center'
          />
          <button
            onClick={handleReroll}
            className='flex w-full border bg-gray-900 text-lg border-gray-700 rounded px-6 py-3 justify-between items-center'
          >
            Reroll <i.Reroll />
          </button>
        </div>
      </div>
    </>
  );
}

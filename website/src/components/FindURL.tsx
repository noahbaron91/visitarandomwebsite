import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/all';
import { TextPlugin } from 'gsap/TextPlugin';
import { PLACEHOLDER_DOMAINS, SEARCHING_TEXT } from '../constants';
import * as Dialog from '@radix-ui/react-dialog';

gsap.registerPlugin(Flip, CustomEase, TextPlugin);

function ChevronRight({ scale }: { scale: number }) {
  return (
    <svg
      width='17'
      height='33'
      viewBox='0 0 17 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ transform: `scale(${scale})` }}
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

function CloseChevron() {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.29289 5.79289C5.68342 5.40237 6.31658 5.40237 6.70711 5.79289L12 11.0858L17.2929 5.79289C17.6834 5.40237 18.3166 5.40237 18.7071 5.79289C19.0976 6.18342 19.0976 6.81658 18.7071 7.20711L13.4142 12.5L18.7071 17.7929C19.0976 18.1834 19.0976 18.8166 18.7071 19.2071C18.3166 19.5976 17.6834 19.5976 17.2929 19.2071L12 13.9142L6.70711 19.2071C6.31658 19.5976 5.68342 19.5976 5.29289 19.2071C4.90237 18.8166 4.90237 18.1834 5.29289 17.7929L10.5858 12.5L5.29289 7.20711C4.90237 6.81658 4.90237 6.18342 5.29289 5.79289Z'
        fill='#A8A29E'
      />
    </svg>
  );
}

function VisitWebsite({ url, className }: { url: string; className: string }) {
  const [open, setIsOpen] = useState(false);

  const [isDontShowAgainChecked, setIsDontShowAgainChecked] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      return;
    }

    // Check if popup is necessary
    const dontShowWarningAgain =
      localStorage.getItem('dont-show-warning-again') === '1' ?? false;

    if (dontShowWarningAgain) {
      window.open(url, '_blank');
      return;
    }

    setIsOpen(true);
  };

  const handleContinue = () => {
    if (isDontShowAgainChecked) {
      localStorage.setItem('dont-show-warning-again', '1');
    }

    // todo: get rid of fade animation when closing
    setIsOpen(false);
    window.open(url, '_blank');
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger className={className}>
        Visit website <ExternalLink />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black opacity-50' />
        <Dialog.Content className='DialogContent xl:w-[525px] fixed top-1/2 z-50 -translate-y-1/2 left-7 right-7 md:left-1/2 md:-translate-x-1/2 bg-gray-950 px-7 py-8 rounded-3xl gap-4 flex flex-col border border-gray-900'>
          <div className='flex items-center justify-between'>
            <Dialog.Title className='text-2xl text-white xl:text-3xl'>
              Warning
            </Dialog.Title>
            <Dialog.Close>
              <CloseChevron />
            </Dialog.Close>
          </div>
          <Dialog.Description asChild>
            <div className='flex flex-col gap-4'>
              <p className='xl:text-lg xl:mt-2'>
                We have made our best effort to filter out any adult or illegal
                content; however, we aren’t able to review every page we index
              </p>
              <span className='font-bold xl:text-lg'>
                Continue at your discretion
              </span>
            </div>
          </Dialog.Description>
          <div className='flex gap-3 items-center'>
            <input
              type='checkbox'
              className='border w-5 h-5 border-gray-500 checked:bg-accent appearance-none rounded'
              id='dont-show-again'
              value={isDontShowAgainChecked ? '1' : '0'}
              onChange={(e) => setIsDontShowAgainChecked(e.target.checked)}
            />
            <label className='xl:text-lg select-none' htmlFor='dont-show-again'>
              Don't show this again
            </label>
          </div>
          <div className='flex flex-col gap-2 xl:mt-2 xl:flex-row-reverse'>
            <button
              className='bg-[#8500EF] rounded border py-3 border-[#BF6FFE] xl:flex-1'
              onClick={handleContinue}
            >
              Continue
            </button>
            <Dialog.Close className='bg-gray-900 py-3 rounded border border-gray-700 xl:flex-1'>
              Cancel
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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

function DesktopScrollAnimation({
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
        console.log({ domain, urlWithoutProtocol });

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
            className='text-2xl text-ellipsis overflow-clip'
            style={{ color: '#A8A29E' }}
          >
            {urlWithoutProtocol}
          </p>
        </div>
        <div className='flex flex-col gap-3 found-link opacity-0'>
          <VisitWebsite
            url={url}
            className='text-lg rounded-lg justify-between items-center py-4 px-9 flex w-[450px] bg-[#8500EF] border border-[#BF6FFE] border-solid'
          />
          <button
            onClick={onReroll}
            className='text-lg px-9 py-4 rounded-lg flex w-[450px] bg-gray-900 border border-gray-700 justify-between items-center'
          >
            Reroll <Reroll />
          </button>
        </div>
      </div>
      <div className='flex items-center gap-12 text-3xl'>
        <div className='fade-out' id='ticker-marker'>
          <ChevronRight scale={1.15} />
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
            className='hide-scrollbar max-h-screen overflow-scroll flex text-lg gap-6 flex-col text-white relative'
          >
            {Array.from({ length: 250 }).map((_, index) => (
              <TextWheelElement
                className='text-4xl pointer-events-none select-none'
                key={index}
              />
            ))}
            <div className='flex flex-col w-full gap-4' ref={targetRef}>
              <p className='text-4xl pointer-events-none select-none'>
                {domain}
              </p>
            </div>
            {Array.from({ length: 25 }).map((_, index) => (
              <TextWheelElement
                className='text-4xl pointer-events-none select-none'
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (arr: string[]) => {
  const index = generateRandomNumber(0, arr.length - 1);
  return arr[index];
};

type Props = {
  url: string;
  onReroll: () => void;
};

function TextWheelElement({ className }: { className: string }) {
  const [domain] = useState(getRandomArrayElement(PLACEHOLDER_DOMAINS));

  return <div className={className}>{domain}</div>;
}

function MobileScrollAnimation({ url, onReroll }: Props) {
  const urlWithoutWWW = url.replace('www.', '');
  const urlWithoutProtocol = urlWithoutWWW.replace(/(^\w+:|^)\/\//, '');
  const domain = urlWithoutProtocol.split('/')[0];

  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [searchText] = useState(getRandomArrayElement(SEARCHING_TEXT));
  const [randomNumberOfTextElements] = useState(generateRandomNumber(250, 300));

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

    gsap.to('#wrapper', {
      opacity: 1,
      duration: 1,
    });

    gsap.to(ref.current, {
      scrollTo: scrollToPosition,
      duration: 10,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0.126,0.382 0.168,0.674 0.326,0.822 0.518,1.002 0.95,1.005 1,1'
      ),
      delay: 0,
      onComplete: () => {
        console.log({ domain, urlWithoutProtocol });

        const textElement = document.getElementById('target-domain');

        gsap.to('.fade-out', {
          opacity: 0,
          delay: 0.25,
          duration: 1,
          ease: 'expo.out',
        });

        setTimeout(() => {
          if (targetRef.current && ref.current && buttonsRef.current) {
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
                gsap.to(buttonsRef.current, {
                  opacity: 1,
                  duration: 0.5,
                  ease: 'power1.inOut',
                });

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
            <ChevronRight scale={1} />
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
              className='hide-scrollbar max-h-96 overflow-scroll flex text-lg gap-3 flex-col text-white relative'
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
                  className='text-3xl text-ellipsis overflow-clip'
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

          <div
            className='flex flex-col gap-2 w-full absolute left-0 right-0 px-12 opacity-0'
            ref={buttonsRef}
          ></div>
        </div>

        <div className='fixed top-[calc(64px_+_54px)] left-0 opacity-0 fade-in flex-col gap-2 w-full px-9'>
          <VisitWebsite
            url={url}
            // target='_blank'
            className='flex px-6 bg-[#8500EF] text-lg border border-[#BF6FFE] py-3 rounded justify-between items-center'
          ></VisitWebsite>
          <button
            onClick={handleReroll}
            className='flex w-full border bg-gray-900 text-lg border-gray-700 rounded px-6 py-3 justify-between items-center'
          >
            Reroll <Reroll />
          </button>
        </div>
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
  const url = useURL();
  const [key, rerender] = useState(Math.random());

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  if (!url || typeof windowWidth !== 'number') {
    return (
      <div className='fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Spinner />
      </div>
    );
  }

  const handleReroll = () => {
    rerender(Math.random());
  };

  if (windowWidth > 968) {
    return (
      <DesktopScrollAnimation url={url} onReroll={handleReroll} key={key} />
    );
  }

  return <MobileScrollAnimation key={key} url={url} onReroll={handleReroll} />;
}

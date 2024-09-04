import { FindURL } from './FindURL';
import { Footer } from './Footer';
import { Spotlight } from './Spotlight';
import { TextComponents } from './TextComponents';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { PageContextProvider, usePageContext } from '../context/page';
import {
  IsHoveringButtonProvider,
  useIsHoveringButton,
} from '../context/IsHoveringButton';
import { Flip } from 'gsap/Flip';
import type { LineLoop } from 'three';

function CTASection() {
  const { setIsHoveringButton } = useIsHoveringButton();
  const { setPage } = usePageContext();

  const handleClick = () => {
    gsap.to('.wrapper', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setPage('find-url');
      },
    });
  };

  const handleMouseEnter = () => {
    setIsHoveringButton(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringButton(false);
  };

  return (
    <div className='flex flex-col gap-3 items-center'>
      <button
        type='button'
        className='pointer-events-auto py-3 px-9 text-xl bg-gray-900 hover:border-accent transition-colors rounded-lg border border-gray-700'
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Visit a random website
      </button>
      <p className='text-gray-400'>over 7,500,000 pages indexed</p>
    </div>
  );
}

function HomePage() {
  return (
    <div className='wrapper'>
      <IsHoveringButtonProvider>
        <Spotlight>
          <div className='w-full fixed pointer-events-none z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-balance flex flex-col items-center gap-9 px-6'>
            <div className='text-3xl lg:text-4xl font-bold flex lg:w-[950px] md:w-[850px] flex-col text-center gap-6 '>
              <h1>96.55% of pages receive no organic search traffic</h1>
              <h1>
                Visit a random website on the internet and discover something
                new
              </h1>
            </div>
            <CTASection />
          </div>
          <TextComponents />
        </Spotlight>
      </IsHoveringButtonProvider>
    </div>
  );
}

function Router() {
  const { page } = usePageContext();

  switch (page) {
    case 'home': {
      return <HomePage />;
    }
    case 'find-url': {
      return <FindURL />;
    }
  }
}

export function App() {
  return (
    <PageContextProvider>
      <Router />
      <Footer />
    </PageContextProvider>
  );
}

gsap.registerPlugin(useGSAP, Flip, ScrollToPlugin);

import { FindURL } from './FindURL';
import { Footer } from './Footer';
import { Spotlight } from './Spotlight';
import { TextComponents } from './TextComponents';
import { VisitARandomWebsite } from './VisitARandomWebsite';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { PageContextProvider, usePageContext } from '../context/page';
import { IsHoveringButtonProvider } from '../context/IsHoveringButton';

function HomePage() {
  return (
    <IsHoveringButtonProvider>
      <Spotlight>
        <div className='w-full fixed pointer-events-none z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-balance flex flex-col items-center gap-9 px-6'>
          <div className='text-2xl lg:text-4xl font-bold flex md:w-[950px] flex-col text-center gap-6'>
            <h1>
              96.55% of pages receive no organic search traffic from Google
            </h1>
            <h1>
              Visit a random website on the internet and discover something new
            </h1>
          </div>
          <div className='flex flex-col gap-3 items-center'>
            <VisitARandomWebsite />
            <p className='text-gray-400'>over 7,500,000 pages indexed</p>
          </div>
        </div>
        <TextComponents />
      </Spotlight>
    </IsHoveringButtonProvider>
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

gsap.registerPlugin(useGSAP, ScrollToPlugin);

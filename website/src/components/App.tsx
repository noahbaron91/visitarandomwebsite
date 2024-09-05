import { FindURL } from './FindURL';
import { Footer } from './Footer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { PageContextProvider, usePageContext } from '../context/PageContext';
import { Flip } from 'gsap/Flip';
import { HomePage } from './HomePage';

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

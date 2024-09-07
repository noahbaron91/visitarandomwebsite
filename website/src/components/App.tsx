import { FindURL } from './FindURL';
import { Footer } from './Footer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { PageContextProvider, usePageContext } from '../context/PageContext';
import { Flip } from 'gsap/Flip';
import { HomePage } from './HomePage';
import { VisitedDomainsProvider } from '../context/VisitedDomains';

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
    <VisitedDomainsProvider>
      <PageContextProvider>
        <Router />
        <Footer />
      </PageContextProvider>
    </VisitedDomainsProvider>
  );
}

gsap.registerPlugin(useGSAP, Flip, ScrollToPlugin);

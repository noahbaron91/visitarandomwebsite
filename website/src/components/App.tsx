import { FindURL } from './FindURL';
import { Footer } from './Footer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { PageContextProvider, usePageContext } from '../context/PageContext';
import { Flip } from 'gsap/Flip';
import { HomePage } from './HomePage';
import { VisitedDomainsProvider } from '../context/VisitedDomains';
import { InstantModeEnabledProvider } from '../context/InstantModeEnabledContext';
import { Instant } from './Instant';

function Router() {
  const { page } = usePageContext();

  switch (page) {
    case 'home': {
      return <HomePage />;
    }
    case 'find-url': {
      return <FindURL />;
    }
    case 'instant': {
      return <Instant />;
    }
  }
}

export function App() {
  return (
    <InstantModeEnabledProvider>
      <VisitedDomainsProvider>
        <PageContextProvider>
          <Router />
          <Footer />
        </PageContextProvider>
      </VisitedDomainsProvider>
    </InstantModeEnabledProvider>
  );
}

gsap.registerPlugin(useGSAP, Flip, ScrollToPlugin);

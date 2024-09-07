import { createContext, useContext, useEffect, useRef, useState } from 'react';

type Context = {
  visitedDomains: string[];
  addVisitedDomain: (domain: string) => void;
};

const VisitedDomainsContext = createContext<Context>({
  addVisitedDomain: () => null,
  visitedDomains: [],
});

const getDomainsFromLocalStorage = () => {
  try {
    const item = window.localStorage.getItem('visitedDomains');

    if (!item) {
      return [];
    }

    const visitedDomains = JSON.parse(item);

    return visitedDomains;
  } catch {
    return [];
  }
};

const setVisitedDomainsToLocalStorage = (visitedDomains: string[]) => {
  const uniqueVisitedDomains = Array.from(new Set(visitedDomains));

  window.localStorage.setItem(
    'visitedDomains',
    JSON.stringify(uniqueVisitedDomains)
  );
};

export const VisitedDomainsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visitedDomains, setVisitedDomains] = useState<string[]>([]);

  const handleAddVisitedDomain = (domain: string) => {
    const currentVisitedDomains = getDomainsFromLocalStorage();

    const updatedVisitedDomains = [...currentVisitedDomains, domain];

    setVisitedDomainsToLocalStorage(updatedVisitedDomains);
    setVisitedDomains(updatedVisitedDomains);
  };

  useEffect(() => {
    const currentVisitedDomains = getDomainsFromLocalStorage();
    setVisitedDomains(currentVisitedDomains);
  }, []);

  return (
    <VisitedDomainsContext.Provider
      value={{ visitedDomains, addVisitedDomain: handleAddVisitedDomain }}
    >
      {children}
    </VisitedDomainsContext.Provider>
  );
};

export const useVisitedDomains = () => {
  const context = useContext(VisitedDomainsContext);

  return context;
};

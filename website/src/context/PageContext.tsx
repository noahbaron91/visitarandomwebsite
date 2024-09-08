import React, { createContext, useContext, useState } from 'react';

type Page = 'home' | 'find-url' | 'instant';

const PageContext = createContext<{
  page: Page;
  setPage: (page: Page) => void;
}>({ page: 'home', setPage: () => null });

export function usePageContext() {
  return useContext(PageContext);
}

export function PageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState<Page>('home');

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}

import { createContext, useContext, useState } from 'react';

const InstantModeEnabledContext = createContext<{
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
}>({ isEnabled: false, setIsEnabled: () => null });

export const useInstantModeEnabled = () => {
  const context = useContext(InstantModeEnabledContext);

  return context;
};

export function InstantModeEnabledProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <InstantModeEnabledContext.Provider value={{ isEnabled, setIsEnabled }}>
      {children}
    </InstantModeEnabledContext.Provider>
  );
}

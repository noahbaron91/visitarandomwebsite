import { createContext, useContext, useState } from 'react';

const IsHoveringButtonContext = createContext<{
  isHoveringButton: boolean;
  setIsHoveringButton: (value: boolean) => void;
}>({ setIsHoveringButton: () => null, isHoveringButton: false });

export const useIsHoveringButton = () => {
  const value = useContext(IsHoveringButtonContext);

  return value;
};

export const IsHoveringButtonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  return (
    <IsHoveringButtonContext.Provider
      value={{
        isHoveringButton,
        setIsHoveringButton,
      }}
    >
      {children}
    </IsHoveringButtonContext.Provider>
  );
};

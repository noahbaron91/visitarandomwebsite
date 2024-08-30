import { useCallback, useEffect, useState } from 'react';

export function TextComponent() {
  return (
    <p
      style={{ top: 250, left: 100 }}
      className='fixed text-gray-700 text-3xl hover:text-accent cursor-pointer'
    >
      thisisit.com
    </p>
  );
}

export function TextComponents() {
  // const [highlight, setHighlight] = useState(0);
  // const [hasEntered, setHasEntered] = useState(false);

  // const [mousePositionY, setMousePositionY] = useState<null | number>(0);
  // const [mousePositionX, setMousePositionX] = useState<null | number>(0);

  // const handleMouseMove = useCallback(() => {
  //   if (!hasEntered) {
  //     return;
  //   }

  //   console.log('highlight');
  // }, [hasEntered]);

  // useEffect(() => {
  //   window.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  // const handleOnMouseEnter = () => {
  //   setHasEntered(true);
  // };

  // const handleOnMouseExit = () => {
  //   setHasEntered(false);
  // };

  return (
    <div
      style={{ top: 250, left: 100 }}
      // onMouseEnter={handleOnMouseEnter}
      // onMouseLeave={handleOnMouseExit}
      className=' fixed text-gray-700 text-3xl hover:text-accent cursor-pointer'
    >
      <div className='relative'>
        <div>thisisit.com</div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { HighlightOnHoverText } from './HighlightOnHoverText';

export function Carousel({ top }: { top: number }) {
  //   const initialLeft = ;
  //   console.log({ initialLeft });

  const [left, setLeft] = useState(-(Math.random() * 1000));

  useEffect(() => {
    setInterval(() => {
      setLeft((prev) => prev - 0.15);
    }, 0.12);
  }, []);

  // add more elements to the carousel every 5 minutes
  // add and remove from dom elements when they cross the screen

  return (
    <div
      className='gap-4 flex items-center fixed text-gray-800 text-3xl cursor-default'
      style={{ top, left }}
    >
      <p>
        <HighlightOnHoverText text='hello.com' />
      </p>
      <p>
        <HighlightOnHoverText text='example.com' />
      </p>
      <p>
        <HighlightOnHoverText text='google.com' />
      </p>
      <p>
        <HighlightOnHoverText text='apple.com' />
      </p>
      <p>
        <HighlightOnHoverText text='microsoft.com' />
      </p>
      <p>
        <HighlightOnHoverText text='wendys.com' />
      </p>
      <p>
        <HighlightOnHoverText text='example.com' />
      </p>
      <p>
        <HighlightOnHoverText text='google.com' />
      </p>
      <p>
        <HighlightOnHoverText text='apple.com' />
      </p>
      <p>
        <HighlightOnHoverText text='microsoft.com' />
      </p>
      <p>
        <HighlightOnHoverText text='wendys.com' />
      </p>
      <p>
        <HighlightOnHoverText text='example.com' />
      </p>
      <p>
        <HighlightOnHoverText text='google.com' />
      </p>
      <p>
        <HighlightOnHoverText text='apple.com' />
      </p>
      <p>
        <HighlightOnHoverText text='microsoft.com' />
      </p>
      <p>
        <HighlightOnHoverText text='wendys.com' />
      </p>
      <p>
        <HighlightOnHoverText text='example.com' />
      </p>
      <p>
        <HighlightOnHoverText text='google.com' />
      </p>
      <p>
        <HighlightOnHoverText text='apple.com' />
      </p>
      <p>
        <HighlightOnHoverText text='microsoft.com' />
      </p>
      <p>
        <HighlightOnHoverText text='wendys.com' />
      </p>
    </div>
  );
}

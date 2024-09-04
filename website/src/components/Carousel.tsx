import { useEffect, useState } from 'react';

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
      <p className='url'>hello.com</p>
      <p className='url'>apple.com</p>
      <p className='url'>microsoft.com</p>
      <p className='url'>wendys.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>wendys.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>wendys.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>wendys.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
      <p className='url'>hello.com</p>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

export function Carousel({ top }: { top: number }) {
  //   const initialLeft = ;
  //   console.log({ initialLeft });
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState(-(Math.random() * 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setLeft((prev) => prev - 0.15);
    }, 0.12);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Add elements infinitely to the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const p = document.createElement('p');
      p.className = 'url';
      p.innerText = 'google.com';
      carouselRef.current?.appendChild(p);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={carouselRef}
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

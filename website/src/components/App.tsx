import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';

export function App() {
  return (
    <div className='my-40 flex flex-col items-center gap-9'>
      <div className='flex w-[950px] flex-col text-center gap-6'>
        <h1 className='text-5xl '>
          96.55% of pages receive no organic search traffic from Google
        </h1>
        <h1 className='text-5xl'>
          Visit a random website on the internet and learn something new
        </h1>
      </div>
      <div className='flex flex-col gap-3 items-center'>
        <button
          type='button'
          className='py-4 px-9 text-2xl bg-[#FF89B4] rounded-lg border border-[#FFE5EF]'
        >
          Visit a random website
        </button>
        <p>over 7,500,000 pages indexed</p>
      </div>
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  );
}

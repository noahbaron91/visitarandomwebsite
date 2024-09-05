import { useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/all';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollAnimation } from './ScrollAnimation/ScrollAnimation';

gsap.registerPlugin(Flip, CustomEase, TextPlugin);

export function FindURL() {
  const [key, rerender] = useState(Math.random());

  const handleReroll = () => {
    rerender(Math.random());
  };

  return <ScrollAnimation key={key} onReroll={handleReroll} />;
}

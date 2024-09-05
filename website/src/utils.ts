import { type RefObject } from 'react';

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomArrayElement = (arr: string[]) => {
  const index = generateRandomNumber(0, arr.length - 1);
  return arr[index];
};

export const calculateScrollToPosition = (
  linkRef: RefObject<HTMLParagraphElement | null>
): number => {
  if (!linkRef.current) return 0;

  const tickerMarker = document.getElementById('ticker-marker');
  const tickerWrapper = document.getElementById('ticker-wrapper');

  if (tickerMarker === null || tickerWrapper === null) return 0;

  const tickerMarkerTop = tickerMarker.getBoundingClientRect().top;
  const tickerWrapperTop = tickerWrapper.getBoundingClientRect().top;

  const topPositionDifference = tickerMarkerTop - tickerWrapperTop;

  const scrollToPosition = linkRef.current.offsetTop - topPositionDifference;

  return scrollToPosition;
};

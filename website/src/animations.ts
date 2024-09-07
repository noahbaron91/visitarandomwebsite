import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/all';
import gsap from 'gsap';

export const moveDomainAnimation = (target: HTMLDivElement) => {
  const promise = new Promise((resolve) => {
    const state = Flip.getState(target);
    target.style.left = '36px';
    target.style.right = '0px';
    target.style.top = '64px';
    target.style.paddingRight = '36px';
    target.style.position = 'fixed';

    Flip.from(state, {
      duration: 1,
      ease: 'power1.out',
      onComplete: resolve,
    });
  });

  return promise;
};

export const fadeInButtonsAnimation = (actionButtons: HTMLDivElement) => {
  actionButtons.style.display = 'flex';

  gsap.to(actionButtons, {
    opacity: 1.5,
    duration: 1,
    ease: 'power1.inOut',
  });
};

export const scrollWheelAnimation = (
  wheel: HTMLDivElement,
  scrollToPosition: number
) => {
  const promise = new Promise((resolve) => {
    gsap.to(wheel, {
      scrollTo: scrollToPosition,
      duration: 5,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0.126,0.382 0.168,0.674 0.326,0.822 0.518,1.002 0.95,1.005 1,1'
      ),
      delay: 0,
      onComplete: resolve,
    });
  });

  return promise;
};

export const fadeInAnimation = (wrapper: HTMLDivElement) => {
  gsap.to(wrapper, {
    opacity: 1,
    duration: 1,
  });
};

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as i from './Icons';

type Props = {
  url: string;
  className: string;
};

export function VisitWebsiteWarning({ url, className }: Props) {
  const [open, setIsOpen] = useState(false);

  const [isDontShowAgainChecked, setIsDontShowAgainChecked] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      return;
    }

    // Check if popup is necessary
    const dontShowWarningAgain =
      localStorage.getItem('dont-show-warning-again') === '1';

    if (dontShowWarningAgain) {
      window.open(url, '_blank');
      return;
    }

    setIsOpen(true);
  };

  const handleContinue = () => {
    if (isDontShowAgainChecked) {
      localStorage.setItem('dont-show-warning-again', '1');
    }

    // todo: get rid of fade animation when closing
    setIsOpen(false);
    window.open(url, '_blank');
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger className={className}>
        Visit website <i.ExternalLink />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black opacity-50' />
        <Dialog.Content className='DialogContent xl:w-[525px] fixed top-1/2 z-50 -translate-y-1/2 left-7 right-7 md:left-1/2 md:-translate-x-1/2 bg-gray-950 px-7 py-8 rounded-3xl gap-4 flex flex-col border border-gray-900'>
          <div className='flex items-center justify-between'>
            <Dialog.Title className='text-2xl text-white xl:text-3xl'>
              Warning
            </Dialog.Title>
            <Dialog.Close>
              <i.CloseChevron />
            </Dialog.Close>
          </div>
          <Dialog.Description asChild>
            <div className='flex flex-col gap-4'>
              <p className='xl:text-lg xl:mt-2'>
                We have made our best effort to filter out any adult or illegal
                content; however, we aren’t able to review every page we index
              </p>
              <span className='font-bold xl:text-lg'>
                Continue at your discretion
              </span>
            </div>
          </Dialog.Description>
          <div className='flex gap-3 items-center'>
            <input
              type='checkbox'
              className='border w-5 h-5 border-gray-500 checked:bg-accent appearance-none rounded'
              id='dont-show-again'
              value={isDontShowAgainChecked ? '1' : '0'}
              onChange={(e) => setIsDontShowAgainChecked(e.target.checked)}
            />
            <label className='xl:text-lg select-none' htmlFor='dont-show-again'>
              Don't show this again
            </label>
          </div>
          <div className='flex flex-col gap-2 xl:mt-2 xl:flex-row-reverse'>
            <button
              className='bg-secondary rounded border py-3 border-[#BF6FFE] xl:flex-1'
              onClick={handleContinue}
            >
              Continue
            </button>
            <Dialog.Close className='bg-gray-900 py-3 rounded border border-gray-700 xl:flex-1'>
              Cancel
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

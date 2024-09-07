import * as Dialog from '@radix-ui/react-dialog';
import * as i from './Icons';

export function Footer() {
  return (
    <>
      <a
        href='https://github.com/noahbaron91/visitarandomwebsite'
        className='fixed bottom-3 left-3'
        target='_blank'
      >
        <i.GitHubIcon />
      </a>
      <Dialog.Root>
        <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50 z-40' />
        <Dialog.Content className='DialogContent xl:w-[525px] fixed top-1/2 z-50 -translate-y-1/2 left-7 right-7 md:left-1/2 md:-translate-x-1/2 bg-gray-950 px-7 py-8 rounded-3xl gap-4 flex flex-col border border-gray-900'>
          <div className='flex justify-between'>
            <Dialog.Title className='text-3xl text-white'>
              I{"'"}m glad!
            </Dialog.Title>
            <Dialog.Close>
              <i.CloseIcon />
            </Dialog.Close>
          </div>

          <Dialog.Description asChild>
            <div className='xl:text-lg flex gap-3 flex-col'>
              <p>
                You can view a full list of my projects on{' '}
                <a
                  href='https://nbaron.com'
                  target='_blank'
                  className='underline text-accent'
                >
                  nbaron.com
                </a>
              </p>
              <p>
                If you want to fund my future projects or show your appreciation
                for my work{' '}
                <a
                  href='https://buymeacoffee.com/noahbaron'
                  className='underline text-accent'
                  target='_blank'
                >
                  you can buy me a coffee
                </a>
              </p>
              <p>I have soooo many projects I can’t wait to build</p>
              <p>Thank you {':)'}</p>
            </div>
          </Dialog.Description>
          <Dialog.Close
            type='button'
            className='bg-gray-900 border border-gray-700 rounded py-3'
          >
            Close
          </Dialog.Close>
          <Dialog.Close></Dialog.Close>
        </Dialog.Content>
        <Dialog.Trigger className='fixed underline text-gray-500 bottom-3 right-3'>
          enjoy this website?
        </Dialog.Trigger>
      </Dialog.Root>
    </>
  );
}

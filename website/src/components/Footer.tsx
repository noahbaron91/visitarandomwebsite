import * as Dialog from '@radix-ui/react-dialog';

function GitHubIcon() {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16 2C8.265 2 2 8.265 2 16C2 22.195 6.0075 27.4275 11.5725 29.2825C12.2725 29.405 12.535 28.985 12.535 28.6175C12.535 28.285 12.5175 27.1825 12.5175 26.01C9 26.6575 8.09 25.1525 7.81 24.365C7.6525 23.9625 6.97 22.72 6.375 22.3875C5.885 22.125 5.185 21.4775 6.3575 21.46C7.46 21.4425 8.2475 22.475 8.51 22.895C9.77 25.0125 11.7825 24.4175 12.5875 24.05C12.71 23.14 13.0775 22.5275 13.48 22.1775C10.365 21.8275 7.11 20.62 7.11 15.265C7.11 13.7425 7.6525 12.4825 8.545 11.5025C8.405 11.1525 7.915 9.7175 8.685 7.7925C8.685 7.7925 9.8575 7.425 12.535 9.2275C13.655 8.9125 14.845 8.755 16.035 8.755C17.225 8.755 18.415 8.9125 19.535 9.2275C22.2125 7.4075 23.385 7.7925 23.385 7.7925C24.155 9.7175 23.665 11.1525 23.525 11.5025C24.4175 12.4825 24.96 13.725 24.96 15.265C24.96 20.6375 21.6875 21.8275 18.5725 22.1775C19.08 22.615 19.5175 23.455 19.5175 24.7675C19.5175 26.64 19.5 28.145 19.5 28.6175C19.5 28.985 19.7625 29.4225 20.4625 29.2825C23.2418 28.3443 25.6568 26.5581 27.3677 24.1753C29.0786 21.7926 29.9993 18.9334 30 16C30 8.265 23.735 2 16 2Z'
        fill='#78716C'
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z'
        fill='#A8A29E'
      />
    </svg>
  );
}

export function Footer() {
  return (
    <>
      <a
        href='https://github.com/noahbaron91/onlyvisitonce'
        className='fixed bottom-3 left-3'
      >
        <GitHubIcon />
      </a>
      <Dialog.Root>
        <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50 z-40' />
        <Dialog.Content className='flex flex-col gap-3 p-6 fixed top-1/2 -translate-y-1/2 left-4 right-4 z-50 bg-gray-950 rounded-3xl border border-gray-900'>
          <div className='flex justify-between'>
            <Dialog.Title className='text-3xl text-white'>
              I{"'"}m glad!
            </Dialog.Title>
            <Dialog.Close>
              <CloseIcon />
            </Dialog.Close>
          </div>

          <Dialog.Description asChild>
            <div className='flex gap-3 flex-col'>
              <p>
                You can view a list of my projects on{' '}
                <a
                  href='https://nbaron.com'
                  target='_blank'
                  className='underline'
                >
                  nbaron.com
                </a>
              </p>
              <p>
                If you want to fund my future ideas or show your appreciation
                for my work{' '}
                <a
                  href='https://buymeacoffee.com/noahbaron'
                  className='underline'
                  target='_blank'
                >
                  you can buy me a coffee
                </a>
              </p>
              <p></p>
              <p>I have soooo many projects I can’t wait to build</p>
              <p>Thank you {':)'}</p>
            </div>
          </Dialog.Description>
          <Dialog.Close
            type='button'
            className='mt-3 bg-gray-900 border border-gray-700 rounded w-52 py-3'
          >
            Close
          </Dialog.Close>
          <Dialog.Close></Dialog.Close>
        </Dialog.Content>
        <Dialog.Trigger className='fixed underline text-gray-500 bottom-3 right-3'>
          enjoyed this website?
        </Dialog.Trigger>
      </Dialog.Root>
    </>
  );
}

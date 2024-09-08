import * as Checkbox from '@radix-ui/react-checkbox';
import { useInstantModeEnabled } from '../context/InstantModeEnabledContext';
import { twMerge } from 'tailwind-merge';
import { useIsHoveringButton } from '../context/IsHoveringButtonContext';

function Check() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.0791 3.08687C12.307 3.31468 12.307 3.68402 12.0791 3.91183L5.66248 10.3285C5.43467 10.5563 5.06533 10.5563 4.83752 10.3285L1.92085 7.41183C1.69305 7.18402 1.69305 6.81467 1.92085 6.58687C2.14866 6.35906 2.51801 6.35906 2.74581 6.58687L5.25 9.09106L11.2542 3.08687C11.482 2.85906 11.8513 2.85906 12.0791 3.08687Z'
        fill='white'
      />
    </svg>
  );
}

export function InstantMode() {
  const { isEnabled, setIsEnabled } = useInstantModeEnabled();
  const { setIsHoveringButton } = useIsHoveringButton();

  const handleCheckedChange: Checkbox.CheckboxProps['onCheckedChange'] = (
    value
  ) => {
    if (typeof value !== 'boolean') return;

    setIsEnabled(value);
  };

  return (
    <div
      className='flex items-center fixed top-7 left-7 z-20 gap-3'
      onMouseEnter={() => setIsHoveringButton(true)}
      onMouseLeave={() => setIsHoveringButton(false)}
    >
      <label htmlFor='instantMode' className='select-none text-lg'>
        Instant Mode
      </label>
      <Checkbox.Root
        checked={isEnabled}
        onCheckedChange={handleCheckedChange}
        id='instantMode'
        className={twMerge(
          'w-5 h-5 rounded bg-white flex items-center transition-colors border border-gray-800 justify-center',
          isEnabled && 'bg-accent border-secondary'
        )}
      >
        <Checkbox.Indicator>{isEnabled && <Check />}</Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
}

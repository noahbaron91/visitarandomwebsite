import { useIsHoveringButton } from '../context/IsHoveringButton';
import { usePageContext } from '../context/Page';
import { HighlightOnHoverText } from './HighlightOnHoverText';

export function VisitARandomWebsite() {
  const { setPage } = usePageContext();
  const { setIsHoveringButton } = useIsHoveringButton();

  const handleClick = () => {
    setPage('find-url');
  };

  return (
    <button
      type='button'
      className='pointer-events-auto py-3 px-9 text-lg bg-gray-900 rounded-lg border border-gray-700'
      onClick={handleClick}
      onMouseEnter={() => setIsHoveringButton(true)}
      onMouseLeave={() => setIsHoveringButton(false)}
    >
      <HighlightOnHoverText
        ignoreIsHoveringButton
        text='Visit a random website'
      />
    </button>
  );
}

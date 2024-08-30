import { usePageContext } from '../context/page';

export function VisitARandomWebsite() {
  const { setPage } = usePageContext();

  const handleClick = () => {
    setPage('find-url');
  };

  return (
    <button
      type='button'
      className='pointer-events-auto py-3 px-9 text-2xl bg-gray-900 rounded-lg border border-gray-700'
      onClick={handleClick}
    >
      Visit a random website
    </button>
  );
}

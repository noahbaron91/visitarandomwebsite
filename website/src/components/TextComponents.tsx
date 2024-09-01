import { HighlightOnHoverText } from './HighlightOnHoverText';

export function TextComponents() {
  const url = 'thisisit.com';

  return (
    <div
      style={{ top: 250, left: 100 }}
      className=' fixed text-gray-700 text-3xl cursor-default'
    >
      <HighlightOnHoverText text={url} />
    </div>
  );
}

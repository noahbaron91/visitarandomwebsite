import { useState } from 'react';
import { getRandomArrayElement } from '../../utils';
import { PLACEHOLDER_DOMAINS } from '../../constants';

export function TextWheelElement({ className }: { className: string }) {
  const [domain] = useState(getRandomArrayElement(PLACEHOLDER_DOMAINS));

  return <div className={className}>{domain}</div>;
}

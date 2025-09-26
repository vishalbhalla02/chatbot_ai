'use client'; // <-- Required to use useState and interactivity

import { useState } from 'react';
import LeftSide from './leftSide';
import RightSide from './rightSide';

export default function Page() {
  const [id, setId] = useState(0);

  return (
    <div className="">
      <LeftSide onSelect={(selectedId) => setId(selectedId)} id={id} />
      <RightSide id={id} />
    </div>
  );
}

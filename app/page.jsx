'use client'; // <-- Required to use useState and interactivity

import { useState } from "react";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";

export default function Page() {
  const [id, setId] = useState(0);
  console.log("id : ",id);
  

  return (
    <div className="flex justify-around">
      <LeftSide onSelect={(selectedId) => setId(selectedId)} />
      <RightSide id={id} />
    </div>
  );
}

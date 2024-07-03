import React, { useState } from "react";

export default function ChildA({ name = "" }) {
  const [count, setCount] = useState(0);
  console.log({ name });
  return (
    <div>
      <div>ChildA {name}</div>
      <button onClick={() => setCount(count + 1)}>child a btn {count}</button>
    </div>
  );
}

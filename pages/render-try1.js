import { useState } from "react";
import ChildA from "@/components/common/child-a";

export default function RenderTry1() {
  const [count, setCount] = useState(0);
  console.log({ count });
  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={() => setCount(count + 1)}>click</button>
      </div>
      <ChildA name="第一個" />
      <ChildA name={`Second: ${count}`} />
    </div>
  );
}

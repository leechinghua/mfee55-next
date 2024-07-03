import { useRef, useState } from "react";
import ChildA from "@/components/common/child-a";

export default function RenderTry2() {
  const countRef = useRef(0);
  console.log(countRef.current);
  return (
    <div>
      <h1>{countRef.current}</h1>
      <div>
        <button
          onClick={() => {
            countRef.current++;
            console.log(countRef.current);
          }}
        >
          click
        </button>
      </div>
      <ChildA name="第一個" />
      <ChildA name={`Second: ${countRef.current}`} />
    </div>
  );
}

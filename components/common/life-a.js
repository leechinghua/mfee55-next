import React, { useEffect, useRef } from "react";

export default function LifeA() {
  const refA = useRef();
  useEffect(() => {
    console.log("LifeA已經掛載---");
    let n = 0;
    setInterval(() => {
      n++;
      console.log({ n });
      refA.current.innerHTML = n;
    }, 500);
    return () => {
      console.log("LifeA即將卸載===");
    };
  }, []);
  return (
    <div>
      <h2>Life A</h2>
      <h5 ref={refA}>begin</h5>
    </div>
  );
}

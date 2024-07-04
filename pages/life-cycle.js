import { useState } from "react";
import LifeA from "@/components/common/life-a";

export default function LifeCycle() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>
        toggle, 目前狀態: {show ? "顯示" : "隱藏"}
      </button>
      <div>{show && <LifeA />}</div>
    </div>
  );
}
